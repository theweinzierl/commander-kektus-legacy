game.Label = me.Renderable.extend({

    init: function(x, y, caption) {

        let settings = {width: 500, height: 500};

        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

        this.font = new me.BitmapText(0, 0, {font: "PressStart2P", size: 0.5});

        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";
        this.caption = caption;
        this.alwaysUpdate = true;
        this.tint.setColor(255, 128, 128);
    
    },

    setCaption: function(caption){
        this.caption = caption;
    },

    update: function(dt){
        this._super(me.Renderable, "update", [dt]);
        return true;
    },

    setPos: function(posX, posY){
        this.pos.x = posX;
        this.pos.y = posY;
    },

    draw : function (renderer) {
        console.log(this.width +  " " + this.height);
      this.font.draw (renderer, this.caption, 1000, 1000);
        let color = renderer.getColor();
    renderer.setColor('#5EFF7E');
    renderer.fillRect(0, 0, this.width, this.height);
    renderer.setColor(color);
    }

});
