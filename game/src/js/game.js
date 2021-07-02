import NetCommunicator from "./NetCommunicator";

/* Game namespace */
export default game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },

    mode: null,

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(320, 240, {parent : "screen", scale : "auto", scaleMethod : "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("wav");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        
        
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        // add our player entity in the entity pool
        me.pool.register("Commander", game.PlayerEntity);
        me.pool.register("Water", game.Water); 
        me.pool.register("Thorn", game.Thorn); 
        me.pool.register("Torch", game.Torch); 
        me.pool.register("Platform", game.Platform);
        me.pool.register("LaserBlast", game.LaserBlast);
        me.pool.register("LaserBlastRetep", game.LaserBlastRetep);
        me.pool.register("KektusThorn", game.KektusThorn);        
        me.pool.register("Bloog", game.Bloog);
        me.pool.register("Slug", game.Slug);
        me.pool.register("Kektus", game.Kektus);
        me.pool.register("Mushroom", game.Mushroom);
        me.pool.register("LevelEntity", game.LevelEntity);
        me.pool.register("Retep", game.Retep);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    
        // Start the game.
        if(this.mode === "multiplayer"){
            this.netCom = new NetCommunicator(this.playerName);
            this.netCom.onGameDataReceived = this.onGameDataReceived.bind(this);
            this.netCom.onOpponentConnected = this.onOpponentConnected.bind(this);
            this.netCom.connect();            
        }
        me.state.change(me.state.PLAY);
    },

    reinitiateRetep(){          
        this.retep = me.game.world.addChild(me.pool.pull("Retep", 32, 544, this.opponentName));
    },


    netCom: null,

    commander:  null,

    retep: null,

    playerName: "",

    opponentName: "",

    onGameDataReceived(data){
        
        if(data !== undefined && this.retep !== null){       
            if(data.entity === "retep"){
               // console.log(data);
             this.retep.onNetworkUpdate(data);
            }else if(data.entity === "retepShot"){
                me.game.world.addChild(me.pool.pull("LaserBlastRetep", data.posX, data.posY, data.direction));
            }
        }
    },

    onOpponentConnected(opponentName){
        if(this.retep === null){
            this.retep = me.game.world.addChild(me.pool.pull("Retep", 32, 544, opponentName));
            this.opponentName = opponentName;
        }
    },

    sendGameData(data){
       if(this.netCom === null) return;
       this.netCom.exchangeGameData(data);
    },

    setPlayerName(name){
        this.playerName = name;
    },

    setMode(mode){
        this.mode = mode;
    }
};
