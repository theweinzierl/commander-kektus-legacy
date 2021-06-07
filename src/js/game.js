import me from "melonjs";

/* Game namespace */
export default game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


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
        console.log(game.resources);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        // add our player entity in the entity pool
        me.pool.register("Commander", game.PlayerEntity);
        me.pool.register("Water", game.Water); 
        me.pool.register("Torch", game.Torch); 
        me.pool.register("LaserBlast", game.LaserBlast);
        me.pool.register("wall", game.wall);

        me.pool.register("Bloog", game.Bloog);
        me.pool.register("Slug", game.Slug);
        me.pool.register("Kektus", game.Kektus);


        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    
        // Start the game.
        me.state.change(me.state.PLAY);
    },

    commander: null, // reference to el comandante!

    height: 240,
    width: 320
};
