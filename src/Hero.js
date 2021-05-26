export default Hero;

/* function KeyPressRegistrar(){
    
    this.keyLeft = [];
    this.keyRight = [];

    this.registerKeyLeft = (callback) => {
        this.keyLeft.push(callback);
        console.log(callback);
    };

    this.registerKeyRight = (callback) => {
        this.keyRight.push(callback);
    };

    document.addEventListener('keydown', event => {
        var callbacks;
        switch(event.key){
            case 'ArrowLeft':
                callbacks = this.keyLeft
                break;
            case 'ArrowRight':
                callbacks = this.keyRight
                break;
        }
        
        callbacks.forEach(element => {element()});        
    });

} */

/* function SpritesLoader(path, id, amount, callback){

    this.path = path;
    this.id = id;
    this.amount = amount;
    this.callback = callback;
    this.images = [];

    this.load = () => {

        for(i = 0; i < amount; i++){

            let tmpImage = new Image();
            tmpImage.addEventListener('load', this.ackLoad);
            tmpImage.src = this.path + id + i + '.png';
            console.log("Loading: " + this.path + id + i + '.png');
            this.images.push(tmpImage);
        }       
    
    };

    this.ackLoad = (ev) => {
       //this.images.push(ev.target);
        //this.amount--;
        console.log("Loaded: " + ev.target)
        if (this.amount === 0){
            console.log("loades all sprites");
            callback(this.images);
            
        }
    }
    

} */

function Hero(character){

    this.character = character;
    this.movements = this.character.movements;
    this.curMovement = 'stand';
    this.direction = 'left';
    this.directionY = '';
    this.curMovementId = 'left_stand';
    this.mathDirection = 0;
    this.posX = 5;
    this.posY = 2;
    this.speedX = 3;
    this.index = 0;

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

            }else{
                this.keyRegistrar[ev.key] = true;
            }

        this.processKeyEvent();
    });

    document.addEventListener('keyup',
        ev => {

           // if(!Object.keys(this.keyRegistrar).includes(ev.key)) return;
            this.keyRegistrar[ev.key] = false;
        
            this.processKeyEvent();
    });

    this.processKeyEvent = function processKeyEvent(){

        // define direction
        if(this.keyRegistrar['ArrowLeft'] === true) {
            this.direction = 'left';
            this.mathDirection = -1;
        }else if (this.keyRegistrar['ArrowRight'] === true){
            this.direction = 'right';
            this.mathDirection = 1;
        }else{
            this.mathDirection = 0;
        }

        if(this.keyRegistrar['ArrowUp'] === true){
            this.direction = 'up';
        }else if (this.keyRegistrar['ArrowDown'] === true){
            this.direction = 'down';
        }

        // interrupts
        if((this.curMovement === 'pogojump') || (this.curMovement === 'pogofall')){
            if(this.keyRegistrar['Control'] || this.keyRegistrar['AltGraph']) this.curMovement = 'fall';
        }

        // define movement
        if((this.curMovement !== 'fall') && (this.curMovement !== 'jump') && (this.curMovement !== 'pogojump') && (this.curMovement !== 'pogofall')){ // while falling > Keen is not controllable
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


                if(this.curMovement.indexOf('stand') !== -1){
                    
                }else{
                    this.curMovement += '_shoot';
                }

                this.mathDirection = 0;

            }
        }

        console.log(this.curMovement);
        
    this.blockJump = this.keyRegistrar['Control'];
    this.blockPogo = this.keyRegistrar['AltGraph'];
    this.blockShoot = this.keyRegistrar[' '];
    };

    this.moveX = () => {
        this.posX = this.posX + (this.speedX * this.mathDirection);           
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

    this.draw = (ctx) => {
        this.curMovementId = this.direction + "_" + this.curMovement;    
        this.index = (this.index + 1) % this.movements[this.curMovementId].amount;
        ctx.drawImage(this.movements[this.curMovementId].sprites[this.index], this.posX, this.posY);
    }

    this.calculate = () => {

      //  console.log('X: ' + this.posX + ' Y: ' + this.posY +  " curMovement: " + this.curMovement + ' curMovementId: ' + this.curMovementId);

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