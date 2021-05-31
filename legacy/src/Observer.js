export default Observer;

function Observer(){


    this.elements = [];

    this.add = (element) => {
        this.elements.push(element);
    };

    this.observe = (element) => {

        this.checkCollision(element);
        //this.bullet();

    };


    this.checkCollision = (element) => {
      
        let vector = {
            north: {
                isColliding: false,
                type: null
            },
            east: {
                isColliding: false,
                type: null
            },
            south: {
                isColliding: false,
                type: null
            },
            west: {
                isColliding: false,
                type: null
            }
        };

        if(element.posY < 70){
            vector.south.isColliding = false;
        }else{
            vector.south.isColliding = true;
        }

        element.invokeCollision(vector);
    }


}