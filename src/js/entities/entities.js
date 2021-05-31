

/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor

        this._super(me.Entity, 'init', [x, y , settings]);

        
        this.body.setMaxVelocity(3, 30);
        this.body.setFriction(0.4, 0);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        this.alwaysUpdate = true;

        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5,6 ,7]);

        this.renderable.addAnimation("stand", [0]);

        this.renderable.setCurrentAnimation("stand");

        
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if(me.input.isKeyPressed('right')){
            this.renderable.flipX(true);
            this.body.force.x = this.body.maxVel.x;

            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
            }
        }else if(me.input.isKeyPressed('left')){
            this.renderable.flipX(true);
            this.body.force.x = -this.body.maxVel.x;

            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
            }
        }else{
            this.body.force.x = 0;
            this.renderable.setCurrentAnimation("stand");
        }

        if(me.input.isKeyPressed('jump')){
            if(!this.body.jumping && !this.body.falling){
                this.body.force.y = -this.body.maxVel.y;
            }
        }else{
            this.body.force.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
