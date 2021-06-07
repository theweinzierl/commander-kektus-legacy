

/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the constructor
        
        this._super(me.Entity, 'init', [x, y, settings]);


        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0.5);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        this.alwaysUpdate = true;

        this.renderable.addAnimation("walk_left", [0, 3]);

        this.renderable.addAnimation("walk_right", [4, 7]);

        this.renderable.addAnimation("jump_left", [8]);
        this.renderable.addAnimation("jump_right", [11]);

        this.renderable.addAnimation("fall_left", [9, 10], 200);
        this.renderable.addAnimation("fall_right", [11, 12, 200]);

        this.renderable.addAnimation("stand_left", [27]);
        this.renderable.addAnimation("stand_right", [28]);

        this.renderable.addAnimation("shoot_walk_right", [19],120);
        this.renderable.addAnimation("shoot_walk_left", [14], 120);

        this.renderable.addAnimation("shoot_jump_right", [20], 120);
        this.renderable.addAnimation("shoot_jump_left", [15], 120);

        this.renderable.addAnimation("die", [25, 26], 300);

        this.renderable.setCurrentAnimation("stand_right");

       this.body.collisionType = me.collision.types.PLAYER_OBJECT;


        this.body.removeShapeAt(0);
        this.body.addShape(new me.Rect(0, 16, 16, 48));

        // specific values
        this.walkRight = true;
        this.type = "commander";
        this.shooting = false;
        this.dead = false;
        this.landing = false;

        if(game.commander !== null){
            game.commander = this;
        }

    },

    /**
     * update the entity
     */
    update: function (dt) {

        if(this.dead){
            this.body.update(dt);
            return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
        }

        if(this.shooting){
            return (this._super(me.Entity, 'update', [dt]));
        }


        if (me.input.isKeyPressed('right')) {
            this.body.force.x = this.body.maxVel.x;
            this.walkRight = true;

            if (!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("walk_right")) {
                this.renderable.setCurrentAnimation("walk_right", () => me.audio.play("walk"));
            }
        }else if (me.input.isKeyPressed('left')) {
            this.body.force.x = -this.body.maxVel.x;
            this.walkRight = false;
            
            if (!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("walk_left")) {
                this.renderable.setCurrentAnimation("walk_left", () => me.audio.play("walk"));
            }

        }else {
            this.body.force.x = 0;
            if (this.walkRight) {
                if (!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("stand_right")) {
                    this.renderable.setCurrentAnimation("stand_right");
                }
            } else {
                if (!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("stand_left")) {
                    this.renderable.setCurrentAnimation("stand_left");
                }
            }
        }

        if (me.input.isKeyPressed('jump')) {

            if (!this.body.jumping && !this.body.falling) {
                this.body.force.y = -this.body.maxVel.y;
                me.audio.play("jump");
                this.landing = true;
            }
            this.body.jumping = true;
        } else {
            this.body.force.y = 0;
        }

        if (this.body.falling) {
            if (this.walkRight) {
                if (!this.renderable.isCurrentAnimation("fall_right")) {
                    this.renderable.setCurrentAnimation("fall_right");
                }
            } else {
                if (!this.renderable.isCurrentAnimation("fall_left")) {
                    this.renderable.setCurrentAnimation("fall_left");
                }
            }
        } else if (this.body.jumping) {

            if (this.walkRight) {
                if (!this.renderable.isCurrentAnimation("jump_right")) {
                    this.renderable.setCurrentAnimation("jump_right");
                }
            } else {
                if (!this.renderable.isCurrentAnimation("jump_left")) {
                    this.renderable.setCurrentAnimation("jump_left");
                }
            }
        }

        if (me.input.isKeyPressed('shoot')){
            
            this.shooting = 1;
            let direction, posX = 0;
            let curAni = "";

            if (this.body.jumping || this.body.falling) {
                curAni = "shoot_jump";
            }else{
                curAni = "shoot_walk";
            }
            
            if(this.walkRight){

                this.renderable.setCurrentAnimation(curAni + "_right", function () {this.shooting = false;}.bind(this));
                direction = 1;
                posX = this.pos.x;

            }else{
                this.renderable.setCurrentAnimation(curAni + "_left", function () {this.shooting = false;}.bind(this));
                direction = -1;
                posX = this.pos.x + 16;
            }                
            
            me.audio.play("shoot");
            this.shooting = true;
            me.game.world.addChild(me.pool.pull("LaserBlast", posX, this.pos.y + 35, direction));
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    isBlockedAnimation: function () {
        return (this.body.jumping || this.body.falling || this.shooting);
    },

    /**
  * colision handler
  */
    onCollision: function (response, other) {
        switch (other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                if(this.landing){
                    this.landing = false;
                    me.audio.play("land");
                }

                return true;
            case me.collision.types.ENEMY_OBJECT:
                
                if(!(other.type === 'monster') || other.alive){
                    this.dead = true;
                    this.renderable.setCurrentAnimation("die");
                    this.body.vel.y = -200;
                    this.body.force.x = 0;
                    me.audio.play("die");
                }

                return false;
            case me.collision.types.PROJECTILE_OBJECT:
                return false;
            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    }

});

/**
 * a Coin entity
 */
game.Water = me.Entity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);
        this.type = "obstacle";

    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function (response, other) {


        return false
    }
});

game.wall = me.Entity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor
    
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function (response, other) {

        return false;
    }
});


game.Torch = me.Entity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor

        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.collisionType = me.collision.types.NO_OBJECT;

    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function (response, other) {


        return false
    }
});


game.LaserBlast = me.Entity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, direction) {

        let settings = {
            image: 'laserblast',
            width: 16,
            height: 16,
            framewidth: 16 
        };
        
        this._super(me.Entity, 'init', [x, y, settings]);

        this.direction = direction;
        this.body.setMaxVelocity(7, 0);
        this.alwaysUpdate = true;

        this.renderable.addAnimation("shoot", [0,1,2,3,4]);
        this.renderable.addAnimation("explode", [5],100);

        this.renderable.setCurrentAnimation("shoot");

        this.type = "buuum";
       this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
       this.body.update();

    },

    
    update: function(dt) {
        if (!this.collided){
            this.body.force.x = this.body.maxVel.x * this.direction;
            me.collision.check(this);
        }      
    
        if ((this.pos.y + this.height <= 0)
            || (this.pos.y + this.height >= game.height)
            || (this.pos.x + this.width <= 0)
            || (this.pos.x + this.width >= game.width)) {
            
               // me.game.world.removeChild(this);
        }

        this.body.update();

        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    onCollision: function (response, other) {
       console.log(other.type);
       if(other.body.collisionType !== me.collision.types.PLAYER_OBJECT){ 
       this.body.setMaxVelocity(0,0);
       
       me.audio.play("laserhit");

            this.renderable.setCurrentAnimation("explode", function () {
                console.log("wasted");
               me.game.world.removeChild(this);
               return false
            }.bind(this));
    
           // this.body.force.x = 0;
           this.collided = true;
            

            
            
            return false;
        }else{
            return false;
        }
    },

});

game.LaserBlast.direction = 0;
game.collided = false;

/**
* an enemy Entity
*/
game.Bloog = me.Sprite.extend(
    {
        init: function (x, y, settings) {
            // save the area size as defined in Tiled
            var width = settings.width;

            // define this here instead of tiled
            settings.image = "bloog";

            // adjust the size setting information to match the sprite size
            // so that the entity object is created with the right size
            settings.framewidth = settings.width = 48;
            settings.frameheight = settings.height = 48;

            


            // call the parent constructor
            this._super(me.Sprite, 'init', [x, y, settings]);

            // add a physic body
            this.body = new me.Body(this);
            // add a default collision shape
            this.body.addShape(new me.Rect(0, 0, settings.framewidth, settings.frameheight));

            // configure max speed and friction
            this.body.setMaxVelocity(4, 6);
            this.body.setFriction(0.4, 0);
            // enable physic collision (off by default for basic me.Renderable)
            this.isKinematic = false;

            // set start/end position based on the initial area size
            x = this.pos.x;
            this.startX = x;
            this.pos.x = this.endX = x + width - this.width;
            //this.pos.x  = x + width - this.width;

            // to remember which side we were walking
            this.walkRight = true;

            // make it "alive"
            this.alive = true;

            this.addAnimation("walk_left", [0, 1, 2, 3]);
            this.addAnimation("walk_right", [4, 5, 6, 7]);
            this.addAnimation("dead", [8]);
            this.setCurrentAnimation("walk_right");

            this.body.collisionType = me.collision.types.ENEMY_OBJECT;
            this.type = "monster";
        },

        // manage the enemy movement
        update: function (dt) {
            if (this.alive) {
                if (!this.walkRight && this.pos.x <= this.startX) {
                    this.walkRight = true;
                    this.setCurrentAnimation("walk_right");
                    this.body.force.x = this.body.maxVel.x;
                }
                else if (this.walkRight && this.pos.x >= this.endX) {
                    this.walkRight = false;
                    this.body.force.x = -this.body.maxVel.x;
                    this.setCurrentAnimation("walk_left");
                }

                
            }
            else {
                this.body.force.x = 0;
            }
            // check & update movement
            this.body.update(dt);

            // handle collisions against other shapes
            me.collision.check(this);

            // return true if we moved or if the renderable was updated
            return (this._super(me.Sprite, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
        },

        /**
         * colision handler
         * (called when colliding with other objects)
         */
        onCollision: function (response, other) {
            if (this.alive && (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT)) {
                this.alive = false;
                this.setCurrentAnimation("dead");
            }else if(other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
                return false;
            }else if(other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
                return false;
            }
            // Make all other objects solid
            return true;
        }
    });
