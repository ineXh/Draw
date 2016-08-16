function Draw(){
    this.init();
}
Draw.prototype = {
    init: function(){
        //this.lines = [];
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(4,0x000000, 1);
        stage.addChild(this.graphics);

    },
    clear: function(){
        this.graphics.clear();
        this.graphics.lineStyle(4,0x000000, 1);
    },
    point: function(x, y){
        this.graphics.drawCircle(x,y, dim/150);
        stage.removeChild(this.graphics);
        stage.addChild(this.graphics);
    },
    horline: function(y){
        this.line(0,y,width,y);
    },
    verline: function(x){
        this.line(x,0,x,height);
    },
    line: function(x1,y1,x2,y2){
        //this.lines.push({x1: x1, y1: y1, x2: x2, y2: y2});
        this.graphics.moveTo(x1,y1);
        this.graphics.lineTo(x2,y2);
        stage.removeChild(this.graphics);
        stage.addChild(this.graphics);
    }
} // end Draw
