
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
        me.pool.register("KektusThorn", game.KektusThorn);        
        me.pool.register("Bloog", game.Bloog);
        me.pool.register("Slug", game.Slug);
        me.pool.register("Kektus", game.Kektus);
        me.pool.register("Mushroom", game.Mushroom);
        me.pool.register("LevelEntity", game.LevelEntity);

        if(this.mode === "multiplayer") me.pool.register("Retep", game.Retep);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    
        // Start the game.
        me.state.change(me.state.PLAY);

    },

    netCom: null,

    commander:  null,

    retep: null,

    onGameDataReceived: function(data){
        //console.log(data);
        if(data !== undefined && this.retep !== null){       
            if(data.entity === "retep"){
             this.retep.onNetworkUpdate(data);
            }else if(data.entity === "retepShot"){
                me.game.world.addChild(me.pool.pull("LaserBlast", data.posX, data.posY, data.direction));
            }
        }
    },

    sendGameData(data){
       if(this.netCom === null) return;
       if(this.retep !== null) this.netCom.exchangeGameData(data);
    },

    setNetCom(netCom){
        netCom.onUpdate = this.onGameDataReceived.bind(this);
        this.netCom = netCom;
    }
};
