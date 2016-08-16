var objects = [];
var points = [];
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

        graphic = new PIXI.Graphics();
        stage.addChild(graphic);
        graphic.position.set(0, 0);

        /*graphic.beginFill(0xff0000,1);
        graphic.drawPolygon([20, 20, // Starting x, y coordinates for the shape
                      40, 50,
                      20, 40,
                    ]);
        graphic.endFill();*/


	},
	update: function(time){
        if(MousePos.touched){
            drawLine();
        }
	},
}; // end GameObjects

var drawLine = function(){
    graphic.clear();
    graphic.lineStyle(dim/400, 0x00, 1);
    for(var i = 0; i < points.length-3; i=i+2){
        graphic.moveTo(points[i], points[i+1]);
        graphic.lineTo(points[i+2], points[i+3]);
    }
}
var drawPolygon = function(){
    //console.log('drawPolygon')
    graphic.clear();
    graphic.beginFill(0xff0000,1);
    graphic.drawPolygon(points);
    graphic.endFill();
}

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
