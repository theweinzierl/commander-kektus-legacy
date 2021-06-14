import {WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";


interface ClientMessage {
    id: number,
    opponentId?: number,
    type: string,
    data?: any
}

interface ServerResponse {
    type: string,
    data: any
}

interface Client {
    id: number,
    ws: WebSocketClient,
    opponent?: Client,
    state: ClientState
}

enum ClientState{
    WAITING,
    BUSY
}

var curClients: Map<number, Client> = new Map();
var idCounter: number = 0;

const wss = new WebSocketServer(8080);


wss.on("connection", function (ws: WebSocketClient) {

    // on connect tell client how to identify
    let id: number = registerClient(ws);
    ws.send(JSON.stringify(
        {
            type: "confirmation", 
            data: {id: id}
        }
    ));

    // broadcast new players-list
    broadcastAllPlayers();

    // register events
    ws.on("message", 
        function (message: string) {
            let cm: ClientMessage = JSON.parse(message);

            switch(cm.type){
                case "all_players":
                    ws.send(getAllPlayers());
                    break;
                case "initiate_game_request":
                    if(cm.opponentId !== undefined && initiateGame(cm.id, cm.opponentId)){
                      //  ws.send(JSON.stringify({type: "initiate_game_confirmation", data: true}));
                    }else{
                        ws.send(getErrorMessage("Game initiation was not successfull!"));
                    }
                    break;
                case "close_game":
                    if(cm.opponentId !== undefined && closeGame(cm.id, cm.opponentId)){
                        ws.send(JSON.stringify({type: "close_game_confirmation", data: true}));
                    }else{
                        ws.send(getErrorMessage("Game closing was not successfull!"));
                    }
                    break;
                case "exchange_game_data":
                    if(cm.opponentId !== undefined) exchangeGameData(cm.id, cm.opponentId, cm.data);
                    break;
                default:
                    ws.send(getErrorMessage("Request-Type does not exist!"));
            }
        }
    );

    ws.on("close", function(){
        closeConnection(ws);
    });
});

function closeConnection(ws: WebSocketClient): void{
    for(let [id, client] of curClients){

        if(client.opponent !== undefined && client.opponent!.ws === ws){
            client.opponent = undefined;
            client.state = ClientState.WAITING;
        }
        if(ws === client.ws){
            curClients.delete(id);
        }
    }
}

function registerClient(ws: WebSocketClient): number{
    let id: number = getId();
    curClients.set(id, 
        {
            id: id,
            ws: ws,
            state: ClientState.WAITING
        }
    );
    console.log("registered @ " + id + " count: " + curClients.size);
    return id;
}

function getAllPlayers() : string{
    let otherPlayers: number[] = new Array();

    for(let [id, client] of curClients){
        if(client.state === ClientState.WAITING){           
            otherPlayers.push(client.id);
        }
    }

    let response: ServerResponse = {type: "all_players", data: otherPlayers};
    return JSON.stringify(response);
}

function broadcastAllPlayers() : void{
    let response: string = getAllPlayers();

    for(let [id, client] of curClients){
        client.ws.send(response);
    }
}

function getErrorMessage(msg: string): string{
    let response: ServerResponse = {type: "error", data : {description: msg}};
    return JSON.stringify(response);
}

function initiateGame(initiatorId: number, opponentId: number): boolean{
    if(initiatorId === opponentId) return false;
    if(!curClients.has(initiatorId) || !curClients.has(opponentId)) return false;

    let initiator: Client | undefined = curClients.get(initiatorId);
    let opponent: Client | undefined = curClients.get(opponentId);
    
    if(initiator === undefined || opponent === undefined) return false;

    if(opponent.state === ClientState.BUSY || initiator.state === ClientState.BUSY) return false;

    initiator.state = ClientState.BUSY;
    opponent.state = ClientState.BUSY;

    initiator.opponent = opponent;
    opponent.opponent = initiator;

    initiator.ws.send(JSON.stringify({type: "initiate_game_confirmation", data: {opponentId: opponent.id}}));
    opponent.ws.send(JSON.stringify({type: "initiate_game_confirmation", data: {opponentId: initiator.id}}));
    return true;
}

function closeGame(initiatorId: number, opponentId: number): boolean{
    if(initiatorId === opponentId) return false;
    if(!curClients.has(initiatorId) || !curClients.has(opponentId)) return false;

    let initiator: Client | undefined = curClients.get(initiatorId);
    let opponent: Client | undefined = curClients.get(opponentId);

    if(initiator === undefined || opponent === undefined) return false;
    if(opponent.opponent!.id !== initiatorId || initiator.opponent!.id !== opponentId) return false;    
    if(opponent.state === ClientState.WAITING || initiator.state === ClientState.WAITING) return false;

    initiator.state = ClientState.WAITING;
    opponent.state = ClientState.WAITING;

    initiator.opponent = opponent;
    opponent.opponent = initiator;

    opponent.ws.send(JSON.stringify({type: "close_game_confirmation", data: true}));
    return true;
}

function exchangeGameData(initiatorId: number, opponentId: number, data: any): void{
    console.log("hello game data exchande!");
    if(initiatorId === opponentId) return;
    if(!curClients.has(initiatorId) || !curClients.has(opponentId)) return;

    let initiator: Client | undefined = curClients.get(initiatorId);
    let opponent: Client | undefined = curClients.get(opponentId);

    if(initiator === undefined || opponent === undefined) return;
    if(opponent.opponent!.id !== initiatorId || initiator.opponent!.id !== opponentId) return;  
    if(opponent.state !== ClientState.BUSY || initiator.state !== ClientState.BUSY) return;

    opponent.ws.send(JSON.stringify({type: "exchange_game_data", data: data}));
}

function getId(): number{
    return idCounter++;
}





wss.on("error", function (e: Error) {
    console.log(e.message);
});