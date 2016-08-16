var objects = [];
var tree;
var draw;
var PI = Math.PI;
function GameObjects(){
	this.init();
}
GameObjects.prototype = {
	init: function(){
		PIXI.loader
		.add('assets/blue_circle.png')
        .add('assets/blue_square.png')
        .add('assets/green_circle.png')
        .add('assets/green_square.png')
        .add('assets/red_circle.png')
        .add('assets/red_square.png')
        .add('assets/squares.png')
        .load(this.onassetsloaded.bind(this));
	},
	onassetsloaded : function(){
		square_red_texture = PIXI.Texture.fromImage("assets/red_square.png");
        square_green_texture = PIXI.Texture.fromImage("assets/green_square.png");
        square_blue_texture = PIXI.Texture.fromImage("assets/blue_square.png");
        squares_texture = PIXI.Texture.fromImage("assets/squares.png");
        circle_red_texture = PIXI.Texture.fromImage("assets/red_circle.png");
        circle_green_texture = PIXI.Texture.fromImage("assets/green_circle.png");
        circle_blue_texture = PIXI.Texture.fromImage("assets/blue_circle.png");

		tree = new QuadTree(stage_width, stage_height);
        draw = new Draw();

        assetsloaded = true;
        //for(var i = 0; i < 2; i++) spawnSquare();
        for(var i = 0; i < 3; i++) spawnSquares();
        objects[0].x = 200;
        objects[0].y = 250;
        objects[0].sprite.rotation = PI/4;
        objects[0].update();
        objects[1].x = 300;
        objects[1].y = 500;
        objects[1].sprite.rotation = PI*2.125;
        objects[1].update();
        objects[2].x = 100;
        objects[2].y = 200;
        objects[2].sprite.rotation = -PI*1.25;
        objects[2].update();
        //isIntersectingRect(objects[0], objects[1]);
        //isI(objects[0], objects[1]);
	},
	update: function(time){
        /*objects.forEach(function(s){
            s.update();
        })*/
        //tree.update();
        for(var i = 0; i < objects.length; i++){
            objects[i].update();
            //if(i == 0){
                var targets = tree.retrieve(objects[i]);
                //var targets = tree.retrieve(objects[i].search_circle);
                //var circle = objects[i].search_circle;
                var intersect = false;
                for(var j = 0; j < targets.length; j++){
                    var target = targets[j];
                    if(target == objects[i]) continue;
                    //console.log(targets)
                    //console.log(i)
                    if(isIntersectingRect(objects[i], target)){
                        switch(i){
                            case 0:
                                objects[i].sprite.tint = 0xFF0000;
                                break;
                            case 1:
                                objects[i].sprite.tint = 0x00FF00;
                                break;
                            case 2:
                                objects[i].sprite.tint = 0x0000FF;
                                break;
                        }
                        intersect = true;
                    }
                }
                if(!intersect){
                    objects[i].sprite.tint = 0xFFFFFF;
                }
            //}
        }
        /*if(isIntersectingRect(objects[0], objects[1])){
            objects[0].sprite.tint = 0xFF0000;
        }else{
            objects[0].sprite.tint = 0xFFFFFF;
        }*/
	},
}; // end GameObjects

var spawnSquare = function(){
    //console.log('spawn')
    var square = new Square(MousePos.x, MousePos.y);
    objects.push(square)
    tree.insert(square)
    tree.getNodes(square.search_circle);
}

var spawnSquares = function(){
    var squares = new Squares(MousePos.x, MousePos.y);
    objects.push(squares)
    tree.insert(squares)
    tree.getNodes(squares.search_circle);
}
