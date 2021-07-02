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
    public onGameDataReceived: CallableFunction = () => {};
    public onOpponentConnected: CallableFunction = () => {};
    private state: ClientState = ClientState.DISCONNECTED;
    private name: string = "";

    constructor(name: string){
        this.name = name;
    }

    connect(): void {
        this.ws = new WebSocket(this.endpoint);

        this.ws.onmessage = this.onMessage;   
    };

    private onMessage(event: any): void{
        let sm: ServerResponse = JSON.parse(event.data);

        switch(sm.type){
            case "connected_confirmation":
                this.id = sm.data.id;
                this.state = ClientState.WAITING;

                let request: ClientMessage = {
                    type: "id_confirmation",
                    id: this.id
                };
                this.send(JSON.stringify(request));

                break;
            case "initiate_game_confirmation":
                this.state = ClientState.BUSY;
                this.opponentId = sm.data.opponentId;
                break;
            case "exchange_game_data":
                //  console.log("Spieldaten empfangen");
                this.onGameDataReceived(sm.data);
                break;
            case "error":
                console.log("Server-Error: " + sm.data.description);
                break;
            default:
                console.log("Received unkown message.");
        }
    }

    initiateGame(opponentId: number):void{
        let request: ClientMessage = {
            type: "initiate_game_request",
            id: this.id,
            opponentId: opponentId
        };
        this.send(JSON.stringify(request));
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