game.PlayScreen = me.Stage.extend({

    onResetEvent: function() {
        // load a level

        me.levelDirector.loadLevel("desert");

    },

    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
