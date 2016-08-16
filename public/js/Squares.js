var Squares_id = 0;
function Squares(x,y){
    this.init(x,y);
}
Squares.prototype = {
    init: function(x,y){
        //this.pos = new PVector(x,y);
        this.press_x = 0;
        this.press_y = 0;
        this.x = x;
        this.y = y;
        this.vx = 0;//Math.random()*width/240;
        this.vy = 0;//Math.random()*height/240;
        this.anchor = {x: 1, y: 0.0};
        this.width = 320;
        this.height = 80;
        this.search_r = 100;
        this.r = this.width/2;
        this.id = Squares_id++;

        this.nodes = [];
        this.count = 0;
        this.time = 30;
        this.search_circle = new Circle(this);

        this.draw();
    },
    update: function(){
        //this.sprite.tint = 0xFFFFFF;
        this.x += this.vx;
        this.y += this.vy;
        this.stayinBorder();
        this.container.x = this.x;
        this.container.y = this.y;
        //this.search_circle.update();
        //if(this.pressed) return;
        this.count++;
        if(this.count < this.time) return;
        this.count = 0;
        if(!tree.check(this)){
            tree.remove(this);
            tree.insert(this);
        }
    },
    draw: function(){
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Sprite(squares_texture);
        this.sprite.anchor.x = this.anchor.x;//0.5;
        this.sprite.anchor.y = this.anchor.y;//0.5;
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.scale =  (this.width) / this.sprite.width;
        this.sprite.scale.set(this.scale);


        var text = new PIXI.Text("" + this.id, {font: '32px Arial', fill: 'blue'})
        text.x = 0;
        text.y = 0;


        //this.container.addChild(this.search_circle.sprite);
        this.container.addChild(this.sprite);
        this.container.addChild(text);

        stage.addChild(this.container);

        this.container.x = this.x;
        this.container.y = this.y;
        var move = this.move;
        var press = this.press;
        var release = this.release;
        this.sprite.interactive = true;
        this.sprite.on('mousedown'          , press.bind(this));
        this.sprite.on('touchstart'         , press.bind(this));
        this.sprite.on('mousemove'          , move.bind(this));
        this.sprite.on('touchmove'          , move.bind(this));
        this.sprite.on('mouseup'            , release.bind(this));
        this.sprite.on('touchend'           , release.bind(this));
        this.sprite.on('touchendoutside'    , release.bind(this));
    },
    press:function(event){
        spritetouched = true;
        this.pressed = true;
        if(event.type == "mousemove"){
            getMouse(event, undefined);
        }else if(event.type == "touchmove"){
            getMouse(event.data.originalEvent, event.data.originalEvent.changedTouches[0]);
        }
        this.press_x = event.data.global.x - this.x;
        this.press_y = event.data.global.y - this.y;
        //console.log('press_x ' + this.press_x + ' this.press_y ' + this.press_y)

        //tree.remove(this);
    },
    move: function(event){
    if(!this.pressed) return;
        if(event.type == "mousemove"){
            getMouse(event, undefined);
        }else if(event.type == "touchmove"){
            getMouse(event.data.originalEvent, event.data.originalEvent.changedTouches[0]);
        }
        this.x = MousePos.x - this.press_x;
        this.y = MousePos.y - this.press_y;
        this.container.x = this.x;
        this.container.y = this.y;
    },
    release:function(){
        if(!this.pressed || !spritetouched) return;
        spritetouched = false;
        this.pressed = false;
        //tree.insert(this);
        //getBound(this);
    },
    stayinBorder : function(){
        getBound(this);
        if(this.left < 0){
            //this.x = Math.abs(this.width)*(this.anchor.x);
            this.x -= this.left;//this.r;
        }
        if(this.right > stage_width){
            //this.x = stage_width - Math.abs(this.width)*(1-this.anchor.x);
            this.x += stage_width - this.right;
        }
        if(this.top < 0){
            //this.y = Math.abs(this.height)*(this.anchor.y);
            this.y -= this.top;
        }
        if(this.bot > stage_height){
            //this.y = stage_height - Math.abs(this.height)*(1-this.anchor.y);
            this.y += stage_height - this.bot;
        }
    /*if (this.x - this.r < 0) {
      this.x = this.r;
      this.vx *= -walldamp;
      return true;
    }
    if (this.x + this.r > stage_width) {
      //println(this.vel);
      this.vx *= -walldamp;
      this.x = stage_width - this.r;
      return true;
    }
    if (this.y -this. r < 0) {
      this.vy *= -walldamp;
      this.y = this.r;
      return true;
    }
    if (this.y + this.r > stage_height) {
      this.vy *= -walldamp;
      this.y = stage_height - this.r;
      return true;
    }*/
    return false;
  }, // end stayinBorder
}
