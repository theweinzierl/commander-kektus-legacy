interface ServerResponse {
    type: string,
    data: any
}

interface ClientMessage {
    id: number,
    opponentId?: number,
    type: string,
    data?: any
}

enum ClientState{
    DISCONNECTED,
    WAITING,
    BUSY
}

class NetCommunicator{
    endpoint: string = "wss://18.192.24.53:8080";
    ws: WebSocket;
    otherPlayers: number[];
    id: number;
    opponentId: number = -1;
    onUpdate: CallableFunction;
    state: ClientState = ClientState.DISCONNECTED;

    connect(): void {
        this.ws = new WebSocket(this.endpoint);
        this.ws.onmessage = function (event: any){
            let sm: ServerResponse = JSON.parse(event.data);
            console.log(sm.type);

            switch(sm.type){
                case "confirmation":
                    this.id = sm.data.id;
                    this.state = ClientState.WAITING;
                case "all_players":
                    this.otherPlayers = sm.data;
                    if(this.otherPlayers.length > 1){
                        if(this.opponentId === -1) this.initiateGame(this.otherPlayers[1]);
                    }
                    break;
                case "initiate_game_confirmation":
                    this.opponentId = sm.data.opponentId;
                    console.log("opponent-Id: " + this.opponentId);
                    break;
                case "close_game_confirmation":
                    
                    break;
                case "exchange_game_data":
               //     console.log("Spieldaten empfangen");
                    this.onUpdate(sm.data);
                    break;
                case "error":
                    console.log("Server-Error: " + sm.data.description);
                    break;
                default:
                    console.log("Received unkown message.");
            }
        }.bind(this);     
    };

    initiateGame(opponentId: number):void{
        let request: ClientMessage = {
            type: "initiate_game_request",
            id: this.id,
            opponentId: opponentId
        };
        this.send(JSON.stringify(request));
    }

    send(request: string): void{
        if(this.state !== ClientState.DISCONNECTED){
            this.ws.send(request);
        }
    }

    exchangeGameData(gameData?: any): void{
        let request: ClientMessage = {
            type: "exchange_game_data",
            id: this.id,
            opponentId: this.opponentId,
            data: gameData
        };
        this.send(JSON.stringify(request));
    }

}
export default NetCommunicator;