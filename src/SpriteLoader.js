export default SpriteLoader;

function SpriteLoader(level, onSuccess){
    
    this.spritesPath = './sprites/';
    this.level = level;
    this.characters = {};
    this.charactersSpriteCount = this.level.spriteCount;
    this.obstacles = {};
    this.obstaclesSpriteCount = 0;
    this.onSuccess = onSuccess;

    this.loadCharacters = () => {
        let test = this;
        this.level.characters.forEach(
            function iterateCharacters(character){

                this.characters[character.name] = {name: character.name, movements: {}};
                
                character.movements.forEach(
                    function iterateMovements(movement){
                        
                        tmpMovement = new Movement(movement.id, movement.amount, movement.fileType, movement.height, movement.width, movement.reference, movement.frameInterval);
                        console.log(movement.amount);
                        for(i = 0; i < movement.amount; i++){
                            console.log(this.spritesPath + character.name + movement.id + movement.fileType);
                            
                            let tmpImage = new Image();
                            tmpImage.addEventListener('load', this.characterSpriteLoaded);

                            tmpImage.addEventListener('error', (err) => {console.log(err)});
                            
                            let fileId = '';
                            if(movement.reference !== ''){
                                fileId = movement.reference;
                            }else{
                                fileId = movement.id;
                            }

                            if(movement.amount <= 1){
                                tmpImage.src = this.spritesPath + character.name + '_' + fileId + movement.fileType;
                            }else{
                                tmpImage.src = this.spritesPath + character.name + '_' + fileId + i + movement.fileType;
                            }
                            
                            tmpMovement.setSprite(i, tmpImage);                            
                        }    
                        
                        this.characters[character.name]['movements'][movement.id] = tmpMovement;
                    }
                , test);
            }
        , test);
    };

    this.characterSpriteLoaded = (ev) => {
        this.charactersSpriteCount--;
        console.log(this.charactersSpriteCount);
        if(this.charactersSpriteCount === 0) this.levelLoaded();
    };

    this.levelLoaded = () => {
        if((this.charactersSpriteCount + this.obstaclesSpriteCount) === 0) this.onSuccess();
    }

    this.getCharacter = (characterName) => {
        console.log(this.characters[characterName]);
        return this.characters[characterName];
    }
}

function Movement(id, amount, fileType, height, width, reference, frameInterval){

    this.id = id;
    this.amount = amount;
    this.fileType = fileType;
    this.height = height;
    this.width = width;
    this.reference = reference;
    this.sprites = new Array(this.amount);
    this.frameDuration = 0;
    this.frameInterval = frameInterval;

    this.setSprite = (index, image) => {
        this.sprites[index] = image;
    };


    
}