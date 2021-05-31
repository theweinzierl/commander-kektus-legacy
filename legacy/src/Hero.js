export default Hero;

function Hero(character){

    this.character = character;
    this.movements = this.character.movements;
    this.curMovement = 'stand';
    this.curSecondaryMovement = 'none';
    this.curDirectionX = 'left';
    this.curDirectionY = 'none';
    this.curMovementId = 'stand_left';
    this.mathDirectionX = 0;
    this.mathDirectionY = 0;
    this.posX = 5;
    this.posY = 2;
    this.speedX = 3;
    this.index = 0;

    this.shootingDuration = 500;
    this.curShootingTime = 0;

    this.jumpHeight = 30;
    this.jumpDirection = 1;
    this.jumpSpeed = 3;
    this.jumpStartPosY = 0;

    this.pogoSpeed = 4;
    this.pogoHeight = 50;

    this.keyRegistrar = {}

    this.blockShoot = false;

    setInterval(this.calculate, 100);

    document.addEventListener('keydown', 
        ev => {
       
            //if(!Object.keys(this.keyRegistrar).includes(ev.key)) return;

            if(ev.key.indexOf('Arrow') !== -1){

                if(ev.key === 'ArrowLeft'){
                    this.keyRegistrar[ev.key] = (this.keyRegistrar['ArrowRight'] ? false : true);
                }else if(ev.key === 'ArrowRight'){
                    this.keyRegistrar[ev.key] = (this.keyRegistrar['ArrowLeft'] ? false: true);
                }

                if(ev.key === 'ArrowUp'){
                    this.keyRegistrar[ev.key] = (this.keyRegistrar['ArrowDown'] ? false : true);
                }else if(ev.key === 'ArrowDown'){
                    this.keyRegistrar[ev.key] = (this.keyRegistrar['ArrowUp'] ? false: true);
                }

            }else{
                this.keyRegistrar[ev.key] = true;
            }
          //  this.processKeyEvent();
   
    });

    document.addEventListener('keyup',
        ev => {

           // if(!Object.keys(this.keyRegistrar).includes(ev.key)) return;
            this.keyRegistrar[ev.key] = false;
         //   this.processKeyEvent();
    });

    this.defineDirection = function defineDirection(){

         // define X-direction
         if(this.keyRegistrar['ArrowLeft'] === true) {
            this.curDirectionX = 'left';
            this.mathDirectionX = -1;
        }else if (this.keyRegistrar['ArrowRight'] === true){
            this.curDirectionX = 'right';
            this.mathDirectionX = 1;
        }else{
            // curDirectionX shall always maintain last direction
            this.mathDirectionX = 0;
        }
        
        // define Y-direction
        if(this.keyRegistrar['ArrowUp'] === true){
            
            this.curDirectionY = 'up';
            this.mathDirectionY = -1;
        }else if (this.keyRegistrar['ArrowDown'] === true){
            this.curDirectionY = 'down';
            this.mathDirectionY = 1;
        }else{
            this.curDirectionY = 'none';
            this.mathDirectionY = 0;
        }
    };

    this.defineMovement = function defineMovement(){

        // define movement-interrupts
        if(((this.curMovement === 'pogojump') || (this.curMovement === 'pogofall')) && !this.blockPogo){
            if(this.keyRegistrar['Control'] || this.keyRegistrar['AltGraph']) this.curMovement = 'fall';
        } 

        // define movement
        if((this.curMovement !== 'fall') && (this.curMovement !== 'jump') 
            && (this.curMovement !== 'pogojump') && (this.curMovement !== 'pogofall')){ // while falling > Keen is not controllable

            if((this.keyRegistrar['Control']) && !this.blockJump){
                this.curMovement = 'jump';
                this.blockJump = true;
                this.jumpStartPosY = this.posY;
                this.moveY();
            }else if (this.keyRegistrar['AltGraph'] && !this.blockPogo){
                this.curMovement = 'pogojump';
                this.blockPogo = true;
                this.jumpStartPosY = this.posY;
                this.moveY();        
            }else{
                if(this.keyRegistrar['ArrowLeft'] || this.keyRegistrar['ArrowRight']){
                    this.curMovement = 'run';
                }else{
                    this.curMovement = 'stand';
                }
            }
        }
        
        if((this.curMovement !== 'pogojump') && (this.curMovement !== 'pogofall')){ // keen cannot shoot while using pogo
            if(this.keyRegistrar[' '] && !this.blockShoot){

                // defines secondary movement shoot
                this.curSecondaryMovement = "shoot";
                this.mathDirectionX = 0;

            }
        }
    }

    this.processKeyEvent = function processKeyEvent(){

        if(this.curSecondaryMovement !== 'shoot'){
            this.defineDirection();
            this.defineMovement();
        }                     

        this.blockJump = this.keyRegistrar['Control'];
        this.blockPogo = this.keyRegistrar['AltGraph'];
        this.blockShoot = this.keyRegistrar[' '];

    };

    this.moveX = () => {
        this.posX = this.posX + (this.speedX * this.mathDirectionX);           
    }

    this.moveY = () => {
        if(this.curMovement === 'jump'){
            this.posY -= this.jumpSpeed;
        }else if(this.curMovement === 'fall'){
            this.posY += this.jumpSpeed;  
        }else if(this.curMovement === 'pogojump'){
            this.posY -= this.pogoSpeed;  
        }else if(this.curMovement === 'pogofall'){
            this.posY += this.pogoSpeed;  
        }              
    }

    this.getMovementId = function getMovementId(){

        let returnValue = '';
        let direction = '';

        // set secondary Movement
        if(this.curSecondaryMovement !== 'none'){
            returnValue = this.curMovement + '_' + this.curSecondaryMovement
        }else{
            returnValue = this.curMovement;
        }

        // set principal direction - only consider Y-Direction while shooting and not running!
        if((this.curSecondaryMovement === 'shoot') && (this.curMovement !== 'run')){
            if(this.curDirectionY !== 'none'){
                direction = this.curDirectionY;
            }else{
                direction = this.curDirectionX;
            }
        }else{
            direction = this.curDirectionX;
        }

        return returnValue + "_" + direction;

    };

    this.draw = (ctx, interval) => {
        this.curMovementId = this.getMovementId();

        if(this.movements[this.curMovementId].frameInterval <= this.movements[this.curMovementId].frameDuration){
            this.index = (this.index + 1) % this.movements[this.curMovementId].amount;
            this.movements[this.curMovementId].frameDuration = 0;
        }        
        
        this.movements[this.curMovementId].frameDuration += interval;

        ctx.drawImage(this.movements[this.curMovementId].sprites[this.index], this.posX, this.posY);
    }

    this.calculate = (interval) => {

        this.processKeyEvent();

        // gets called repeatedly; enables self-controlled animation
        
        this.moveY();
        this.moveX();

        if(this.curMovement === 'jump'){            
            if((this.jumpStartPosY - this.jumpHeight) >= this.posY){
                this.curMovement = 'fall';
            }            
        }else if(this.curMovement === 'pogojump'){
            if((this.jumpStartPosY - this.pogoHeight) >= this.posY){
                this.curMovement = 'pogofall';
            }   
        }

        this.curShootingTime += interval;
        if(this.curShootingTime >= this.shootingDuration){
            this.curShootingTime = 0;
            this.curSecondaryMovement = 'none';
        }

    }

    this.invokeCollision = function invokeCollision(vector){
        
        if(vector.south.isColliding){
            if(this.curMovement === 'fall'){
                this.curMovement = 'stand';
                
            }else if(this.curMovement === 'pogofall'){
                this.curMovement = 'pogojump';
            }



        }else{
            if((this.curMovement !== 'jump') && (this.curMovement !== 'pogojump') && (this.curMovement !== 'pogofall')) this.curMovement = 'fall';
        }

    };

}