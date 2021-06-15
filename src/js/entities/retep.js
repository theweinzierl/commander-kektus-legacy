game.Retep = me.Entity.extend({

    init: function (x, y, settings) {

        this._super(me.Entity, 'init', [x, y, settings]);

        this.renderable.addAnimation("walk_left", [0, 3]);
        this.renderable.addAnimation("walk_right", [4, 7]);
        this.renderable.addAnimation("jump_left", [8]);
        this.renderable.addAnimation("jump_right", [11]);
        this.renderable.addAnimation("fall_left", [9, 10], 200);
        this.renderable.addAnimation("fall_right", [11, 12, 200]);
        this.renderable.addAnimation("stand_left", [27]);
        this.renderable.addAnimation("stand_right", [28]);
        this.renderable.addAnimation("shoot_walk_right", [19], 120);
        this.renderable.addAnimation("shoot_walk_left", [14], 120);
        this.renderable.addAnimation("shoot_jump_right", [20], 120);
        this.renderable.addAnimation("shoot_jump_left", [15], 120);
        this.renderable.addAnimation("surf", [29]);
        this.renderable.addAnimation("die", [25, 26], 200);

        this.renderable.setCurrentAnimation("stand_right");
        this.currentAnimation = "stand_right";

        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0.5);    
        this.body.removeShapeAt(0);
        this.body.addShape(new me.Rect(0, 16, 16, 48));
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        game.retep = this;

    },

    setCurrentAnimation(animation){
        if(animation !== this.currentAnimation){
            this.currentAnimation = animation;
            this.renderable.setCurrentAnimation(this.currentAnimation);
        }
    }

});