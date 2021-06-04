

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
        
        
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0.5);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        this.alwaysUpdate = true;

        this.renderable.addAnimation("walk_left", [0, 3]);

        this.renderable.addAnimation("walk_right", [4, 7]);

        this.renderable.addAnimation("jump_left", [8]);
        this.renderable.addAnimation("jump_right", [11]);

        this.renderable.addAnimation("fall_left", [9, 10], 300);
        this.renderable.addAnimation("fall_right", [11, 12, 300]);

        this.renderable.addAnimation("stand_left", [27]);
        this.renderable.addAnimation("stand_right", [28]);

        this.renderable.setCurrentAnimation("stand_right");

        this.body.removeShapeAt(0);
        this.body.addShape(new me.Rect(0, 16, 16, 48));

        // specific values
        this.walkRight = true;

    },

    /**
     * update the entity
     */
    update : function (dt) {

        if(me.input.isKeyPressed('right')){
            this.body.force.x = this.body.maxVel.x;
            this.walkRight = true;
         

            if(!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("walk_right")){
                this.renderable.setCurrentAnimation("walk_right");
            }
        }else if(me.input.isKeyPressed('left')){
            this.body.force.x = -this.body.maxVel.x;
            this.walkRight= false;

            if(!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("walk_left")){
                this.renderable.setCurrentAnimation("walk_left");
            }
        }else{
            this.body.force.x = 0;
            if(this.walkRight){
                if(!this.isBlockedAnimation() && !this.renderable.isCurrentAnimation("stand_right")){
                    this.renderable.setCurrentAnimation("stand_right");
                }                
            }else{
                if(!this.isBlockedAnimation() &&  !this.renderable.isCurrentAnimation("stand_left")){
                    this.renderable.setCurrentAnimation("stand_left");
                }  
            }            
        }

        if(me.input.isKeyPressed('jump')){
            
            if(!this.body.jumping && !this.body.falling){
                this.body.force.y = -this.body.maxVel.y;
            }

            
            this.body.jumping = true;
        }else{
            this.body.force.y = 0;
        }

        if(this.body.falling){
            if(this.walkRight){
                if(!this.renderable.isCurrentAnimation("fall_right")){
                    this.renderable.setCurrentAnimation("fall_right");
                }                
            }else{
                if(!this.renderable.isCurrentAnimation("fall_left")){
                    this.renderable.setCurrentAnimation("fall_left");
                }  
            }
        }else if(this.body.jumping){
        
            if(this.walkRight){
                if(!this.renderable.isCurrentAnimation("jump_right")){
                    this.renderable.setCurrentAnimation("jump_right"); 
                }          
            }else{
                if(!this.renderable.isCurrentAnimation("jump_left")){
                    this.renderable.setCurrentAnimation("jump_left");
                } 
            }
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    isBlockedAnimation: function() {
        console.log(this.body.jumping);
        return (this.body.jumping || this.body.falling);
    },

   /**
 * colision handler
 */
onCollision : function (response, other) {
    switch (response.b.body.collisionType) {
      case me.collision.types.WORLD_SHAPE:
        // Simulate a platform object
        if (other.type === "platform") {
          if (this.body.falling &&
            !me.input.isKeyPressed('down') &&
  
            // Shortest overlap would move the player upward
            (response.overlapV.y > 0) &&
  
            // The velocity is reasonably fast enough to have penetrated to the overlap depth
            (~~this.body.vel.y >= ~~response.overlapV.y)
          ) {
            // Disable collision on the x axis
            response.overlapV.x = 0;
  
            // Repond to the platform (it is solid)
            return true;
          }
  
          // Do not respond to the platform (pass through)
          return false;
        }
        break;
  
      case me.collision.types.ENEMY_OBJECT:
        if ((response.overlapV.y>0) && this.body.falling) {
          // bounce (force jump)
          this.body.vel.y = -this.body.maxVel.y;
        }
        else {
          // let's flicker in case we touched an enemy
          this.renderable.flicker(750);
        }
  
        // Fall through
  
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
 game.WaterEntity = me.Entity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
      // call the parent constructor
      this._super(me.Entity, 'init', [x, y , settings]);
  
    },
  
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision : function (response, other) {

  
      return false
    }
  });


  game.TorchEntity = me.Entity.extend({
     // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor
        
        this._super(me.Entity, 'init', [x, y , settings]);
        this.body.collisionType = me.collision.types.NO_OBJECT;
    
      },
    
      // this function is called by the engine, when
      // an object is touched by something (here collected)
      onCollision : function (response, other) {
  
    
        return false
      }
  });

  /**
 * an enemy Entity
 */
 game.EnemyEntity = me.Sprite.extend(
    {
        init: function (x, y, settings)
        {
            // save the area size as defined in Tiled
            var width = settings.width;
   
            // define this here instead of tiled
            settings.image = "wheelie_right";
   
            // adjust the size setting information to match the sprite size
            // so that the entity object is created with the right size
            settings.framewidth = settings.width = 64;
            settings.frameheight = settings.height = 64;
   
            // call the parent constructor
            this._super(me.Sprite, 'init', [x, y , settings]);
   
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
            this.walkLeft = false;
   
            // make it "alive"
            this.alive = true;
        },
   
        // manage the enemy movement
        update : function (dt)
        {
            if (this.alive)
            {
                if (this.walkLeft && this.pos.x <= this.startX)
                {
                    this.walkLeft = false;
                    this.body.force.x = this.body.maxVel.x;
                }
                else if (!this.walkLeft && this.pos.x >= this.endX)
                {
                    this.walkLeft = true;
                    this.body.force.x = -this.body.maxVel.x;
                }
   
                this.flipX(this.walkLeft);
            }
            else
            {
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
        onCollision : function (response, other) {
            if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
                // res.y >0 means touched by something on the bottom
                // which mean at top position for this one
                if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
                    this.renderable.flicker(750);
                }
                return false;
            }
            // Make all other objects solid
            return true;
        }
    });

