

game.Retep = me.Sprite.extend({

    init: function (x, y, settings) {

        settings.image = "retep";
        settings.framewidth = settings.width = 48;
        settings.frameheight = settings.height = 48;

        this._super(me.Sprite, 'init', [x, y, settings]);

        this.addAnimation("walk_left", [0, 3]);
        this.addAnimation("walk_right", [4, 7]);
        this.addAnimation("jump_left", [8]);
        this.addAnimation("jump_right", [11]);
        this.addAnimation("fall_left", [9, 10], 200);
        this.addAnimation("fall_right", [11, 12, 200]);
        this.addAnimation("stand_left", [27]);
        this.addAnimation("stand_right", [28]);
        this.addAnimation("shoot_walk_right", [19], 120);
        this.addAnimation("shoot_walk_left", [14], 120);
        this.addAnimation("shoot_jump_right", [20], 120);
        this.addAnimation("shoot_jump_left", [15], 120);
        this.addAnimation("surf", [29]);
        this.addAnimation("die", [25, 26], 200);

        this.setCurrentAnimation("stand_right");
        this.currentAnimation = "stand_right";
        this.alwaysUpdate = true;

        game.retep = this;
    },

    onNetworkUpdate: function (data){
        this.pos.x = data.posX;
        this.pos.y = data.posY + 16;
        this.setMyCurrentAnimation(data.currentAnimation);
    },

    setMyCurrentAnimation: function(animation){
        if(animation !== this.currentAnimation){
            this.currentAnimation = animation;
            this.setCurrentAnimation(this.currentAnimation);
        }
    },

    update: function (dt) {
        this._super(me.Sprite, "update", [dt]);
        return true;
    }

});