import { runInThisContext } from "vm";

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
    private endpoint: string = "wss://18.192.24.53:8080";
    private ws: WebSocket;
    private otherPlayers: number[];
    private id: number;
    private opponentId: number = -1;
    public onGameDataReceived: (data: any) => void = () => {};
    public onOpponentConnected: (name: string) => void = () => {};
    private state: ClientState = ClientState.DISCONNECTED;
    private playerName: string = "";

    constructor(playerName: string){
        this.playerName = playerName;
    }

    connect(): void {
        this.ws = new WebSocket(this.endpoint);
        this.ws.onmessage = this.onMessage.bind(this);   
    }

    private onMessage(event: any): void{
        let sm: ServerResponse = JSON.parse(event.data);
        
        switch(sm.type){
            case "connect_confirmation":
                this.id = sm.data.id;
                this.state = ClientState.WAITING;

                let request: ClientMessage = {
                    type: "id_confirmation",
                    id: this.id,
                    data: {playerName: this.playerName}
                };
                this.send(JSON.stringify(request));

                break;
            case "initiate_confirmation":
                this.state = ClientState.BUSY;
                this.opponentId = sm.data.opponentId;
                this.onOpponentConnected(sm.data.opponentName);
                //this.onGameDataReceived(sm.data);
                break;
            case "exchange_game_data":
                this.onGameDataReceived(sm.data);
                break;
            case "error":
                console.log("Server-Error: " + sm.data.description);
                break;
            default:
                console.log("Received unkown message.");
        }
    }

    private send(request: string): void{
        if(this.state !== ClientState.DISCONNECTED){
            this.ws.send(request);
        }
    }

    exchangeGameData(gameData?: any): void{
        if(this.state !== ClientState.BUSY) return;
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