var Engine = (function(global) {
    window.scrollTo(0,1);
	startTime = Date.now();
	width 	= window.innerWidth;
	height 	= window.innerHeight;
    width = screen.availWidth;
    height = screen.availHeight;

	dim = (width < height) ? width : height;
	big_dim = (width < height) ? height : width;
    stage_width = big_dim*1.0;
    stage_height = big_dim*1.0;
	scope_width = width*0.15;
	scope_height = height*0.15;

    //console.log('width ' + width + ' height ' + height + ' stage_width ' + stage_width + ' stage_height ' + stage_height)


	renderer = PIXI.autoDetectRenderer(width, height*1.0 ,{backgroundColor : 'Black'});//LightCyan});//'Black'});GrassColor 0x4F8EDB
	// view is canvas
	document.body.appendChild(renderer.view);

    addListeners();

    stage = new PIXI.Container();

    var border = new PIXI.Graphics();
    border.lineStyle(dim/100, 0x00, 1);
    border.beginFill(0xAAAAAA, 0.5);
    border.drawRect(0, 0, stage_width, stage_height);
    stage.addChild(border);

    gameobjects = new GameObjects();


	animate();
})(this);


function update(){
    //console.log('update')
	 var now = Date.now(),
         dt  = (now - lastTime),
         t   = (now - startTime);
    time = {t:t, dt: dt};
    lastTime = now;

    if(assetsloaded){
        if(gameobjects != undefined) gameobjects.update(time);
    }
}

function animate() {
	update();
    renderer.render(stage);
	requestAnimationFrame( animate );
}
