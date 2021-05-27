export default Battlefield;

function Battlefield(battlefield, elements, refreshInterval){

    this.elements = elements;
    this.battlefield = battlefield;
    this.refreshInterval = refreshInterval;

    this.battlefield.getContext('2d').scale(2,2);

    this.refresh = () => {
        //console.log("refresh!");

        let ctx = this.battlefield.getContext('2d');
        ctx.clearRect(0, 0, this.battlefield.width, this.battlefield.height);

        elements.forEach(element => {
            element.draw(ctx, refreshInterval);
        });
    };

}