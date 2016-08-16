var MousePos = {x: 0, y:0, x_pct: 0, y_pct: 0, px: 0, py: 0, sx: 0, sy: 0, raw_x: 0, raw_y: 0,
				stage_x: 0, stage_y: 0, stage_x_pct:0, stage_y_pct:0, clicked: false, touched: false, multitouched: false};
function getMouse(event, touchobj){
	//console.log(touchobj)
	MousePos.px = MousePos.x;
	MousePos.py = MousePos.y;
	if(touchobj != undefined){
		MousePos.x = touchobj.clientX;
		MousePos.y = touchobj.clientY;
		//console.log(touchobj)
	}else if(event.clientX != undefined) {
		//console.log(event)
		MousePos.x = event.clientX;//data.global.x;
        MousePos.y = event.clientY;//data.global.y;
        //console.log(MousePos);
	}else{
		//console.log(event)
		MousePos.x = event.data.global.x;
		MousePos.y = event.data.global.y;
	}
  MousePos.raw_x = MousePos.x;
  MousePos.raw_y = MousePos.y;
  MousePos.x = MousePos.x / stage.scale.x;
  MousePos.y = MousePos.y / stage.scale.y;
	MousePos.x_pct = MousePos.x / width;
	MousePos.y_pct = MousePos.y / height;
	MousePos.stage_x = MousePos.x - stage.x / stage.scale.x;
	MousePos.stage_y = MousePos.y - stage.y / stage.scale.y;
	MousePos.stage_x_pct = MousePos.stage_x / stage.width;
	MousePos.stage_y_pct = MousePos.stage_y / stage.height;

}

function onMouseStart(event){
  if(spritetouched) return;
	//console.log("mouse start")
  if(spritetouched_cancel_cb != null){
    spritetouched_cancel_cb();
    spritetouched_cancel_cb = null;
  }
	getMouse(event, undefined);
	MousePos.sx = MousePos.x;
	MousePos.sy = MousePos.y;
	//document.addEventListener("mousemove", onMouseMove, false);
    if(drag(MousePos.x, MousePos.y)){
        return;
    }
	MousePos.touched = true;

  if(game != undefined) game.onTouchStart();

}
function onMouseMove(event){
    if(!MousePos.touched) return;
    //console.log("onMouseMove")
	getMouse(event, undefined);

    if(game != undefined) game.onTouchMove();
}
function onMouseUp(event){
  if(spritetouched) spritetouched = false;
    if(!MousePos.touched) return;
    //console.log("mouse up")
	getMouse(event, undefined);

    MousePos.touched = false;

    if(game != undefined) game.onTouchEnd();
}
function onTouchStart(event){
  if(spritetouched) return;
  if(spritetouched_cancel_cb != null){
    //console.log('not null')
    spritetouched_cancel_cb();
    spritetouched_cancel_cb = null;
  }
  //console.log('utils touch start')
    //$( "#draggable" ).position()
	//console.log(event.changedTouches[0]);
    event.preventDefault();

    // onTouchStart for 2nd + finger
    if(MousePos.touched){
      onMultiTouchStart(event)
      return;
    }
	getMouse(event, event.changedTouches[0]);
	MousePos.sx = MousePos.x;
	MousePos.sy = MousePos.y;
  MousePos.px = MousePos.x;
  MousePos.py = MousePos.y;
	//console.log(MousePos);
	/*if(drag(MousePos.x, MousePos.y)){
        return;
    }*/
    MousePos.touched = true;
    //console.log(MousePos)
    //console.log('touched')
    if(game != undefined) game.onTouchStart();

/*    particles.spawn({x: MousePos.stage_x_pct*stage.width,
                     y: MousePos.stage_y_pct*stage.height,
                     container: stage},//particles.container
                     ParticleType.FIREBALL);*/

    //spawnCow();

    /*var input = {   x: MousePos.stage_x_pct*stage.width,
                    y: MousePos.stage_y_pct*stage.height,
                    type: CharacterType.Hut, team: this.team, color: this.color};
	var character = characters.spawn(input);
	if(character != null) characters.characters[input.type].push(character);*/

    //characters.spawn({x: MousePos.stage_x_pct*stage.width, y:MousePos.stage_y_pct*stage.height}, CharacterType.Hut);
	/*characters.spawn({x: MousePos.stage_x_pct*stage.width, y:MousePos.stage_y_pct*stage.height}, CharacterType.Cow);
	communication.socket.emit('spawn', {x: MousePos.stage_x_pct, y:MousePos.stage_y_pct});*/
} // end onTouchStart
function onMultiTouchStart(event){
  if(MousePos.touched) MousePos.multitouched = true;
  if(game != undefined) game.onTouchStart();
}
function onTouchMove(event){
    event.preventDefault();
    if(!MousePos.touched) return;
    //console.log('onTouchMove ' + MousePos.touched)

    //console.log(event.changedTouches)
	getMouse(event, event.changedTouches[0]);
    //stage.x -= MousePos.px - MousePos.x;
    //stage.y -= MousePos.py - MousePos.y;
    onMultiTouchMove(event);
    if(game != undefined) game.onTouchMove(event);
} // end onTouchMove
function onMultiTouchMove(event){
  if(!MousePos.multitouched) return;
  //console.log('onMultiTouchMove')
  //console.log(event.changedTouches);
}

function onTouchEnd(event){
  if(spritetouched) spritetouched = false;
  //console.log('util touchend')
  //console.log(event.changedTouches)
    event.preventDefault();
    if(!MousePos.touched) return;
	//console.log('onTouchEnd')
	//getMouse(event);
	getMouse(event, event.changedTouches[0]);
	MousePos.touched = false;


    if(game != undefined) game.onTouchEnd();
    if(MousePos.multitouched && event.changedTouches.length <= 1){
      pan_end();
      zoom_end();
      MousePos.multitouched = false;
    }
	//path.addPoint(MousePos.x, MousePos.y);
	//path.drawPath();
}
function addListeners(){
    renderer.view.addEventListener("mousedown", onMouseStart, true);
    renderer.view.addEventListener("mouseup", onMouseUp, true);
    renderer.view.addEventListener("mousemove", onMouseMove, true);
    renderer.view.addEventListener("touchstart", onTouchStart, true);
    renderer.view.addEventListener("touchend", onTouchEnd, true);
    renderer.view.addEventListener("touchmove", onTouchMove, true);
    renderer.view.addEventListener("backbutton", backButtonTap, true);
}
function removeListeners(){
    renderer.view.removeEventListener("mousedown", onMouseStart, true);
    renderer.view.removeEventListener("mouseup", onMouseUp, true);
    renderer.view.removeEventListener("mousemove", onMouseMove, true);
    renderer.view.removeEventListener("touchstart", onTouchStart, true);
    renderer.view.removeEventListener("touchend", onTouchEnd, true);
    renderer.view.removeEventListener("touchmove", onTouchMove, true);
    renderer.view.removeEventListener("backbutton", backButtonTap, true);
}
function drag(x,y){
    if($( "#chatwindow" ).length < 1) return false;
    var left = $( "#chatwindow" ).position().left;
    var right = left + $( "#chatwindow" ).width()*1.2;
    var top = $( "#chatwindow" ).position().top;
    var bot = top + $( "#chatwindow" ).height()*1.2;
    //console.log(( x > right || x < left || y > bot || y < top))
    return !( x > right || x < left || y > bot || y < top);
}
var unitid = 0;
function spawnCow(){
if(gamestate != GameState.InPlay) return;
var input = {   x: MousePos.x,
                        y: MousePos.y,
                        id: unitid++,
                    type: CharacterType.Cow, team: game.teams[0].team, color:  game.teams[0].color};
            var character = characters.spawn(input);
            game.teams[0].characters[input.type].push(character);
}

function backButtonTap(){

}

function stayinBorder(pos){
	temp = pos.clone();
	temp.sub(new PVector(stage.width/2, stage.height/2));
	if(temp.mag() > stage.width/2){
		var ang = Math.atan2(temp.y, temp.x);
		pos.x = stage.width/2 + stage.width/2*Math.cos(ang);
		pos.y = stage.height/2 + stage.height/2*Math.sin(ang);
	}
}
function findDist(a, b) {
  return PVector.dist(a, b);
} // end findDist
function findDistSimple(a, b) {
  return PVector.distsimple(a, b);
} // end findDist

function intersectCR(cx,cy,cr,rx,ry,rw,rh){
	var circleDistance = new PVector(0,0);
	circleDistance.x = Math.abs(cx-rx);
	circleDistance.y = Math.abs(cy-ry);
	if(circleDistance.x > (rw/2 + cr)) return false;
	if(circleDistance.y > (rh/2 + cr)) return false;
	if(circleDistance.x <= (rw/2)) return true;
	if(circleDistance.y <= (rh/2)) return true;

	var cornerDistance_sq = (circleDistance.x - rw/2)*(circleDistance.x - rw/2) + (circleDistance.y - rh/2)*(circleDistance.y - rh/2);
	return (cornerDistance_sq <= (cr*cr));
} // end intersectCR
function withinDist(pos, other, r){
	var d = PVector.dist(pos, other);
	//console.log(r)
	if(d < r) return true;
	return false;
} // end withinDist
function checkonScreen(pos){
	var right = -stage.x + width;
	var left = -stage.x;
	var bot = -stage.y + height;
	var top = -stage.y;

	if(pos.x > right) return false;
	if(pos.x < left) return false;
	if(pos.y < top) return false;
	if(pos.y > bot) return false;
	return true;
} // end checkonScreen
function RGBColor(r,g,b){
	return (r * 65536 + g * 256 + b);
}
function getRndColor() {
    /*var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return (r * 65536 + g * 256 + b)//'rgb(' + r + ',' + g + ',' + b + ')';*/
    return Math.random() * 0xFFFFFF;
}
function getRngColor(r1,r2,g1,g2,b1,b2) {
    var r = r2*Math.random()|r1,
        g = g2*Math.random()|g1,
        b = b2*Math.random()|b1;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getBound(r){
	if(r.anchor == undefined){
		r.anchor = {x: 0.5, y: 0.5};
	}
	//console.log(r)
	r.right = (r.x + Math.abs(r.width)*(1-r.anchor.x));
	//console.log(r.right)
	r.left = (r.x - Math.abs(r.width)*(r.anchor.x));
	r.bot = (r.y + Math.abs(r.height)*(1-r.anchor.y));
	r.top = (r.y - Math.abs(r.height)*(r.anchor.y));
}
// for sprite
function isIntersecting(r1, r2) {
	// object 2 is Right of object 1?
	var right 	= (r2.x - Math.abs(r2.width)*(r2.anchor.x)) >= (r1.x + Math.abs(r1.width)*(1-r1.anchor.x));
	var left 	= (r2.x + Math.abs(r2.width)*(1-r2.anchor.x)) <= (r1.x - Math.abs(r1.width)*(r1.anchor.x));
	var bot 	= (r2.y - Math.abs(r2.height)*(r2.anchor.y)) >= (r1.y + Math.abs(r1.height)*(1-r1.anchor.y));
	var top 	= (r2.y + Math.abs(r2.height)*(1-r2.anchor.y)) <= (r1.y - Math.abs(r1.height)*(r1.anchor.y));
	//console.log("right " + right);
	//console.log("left " + left);
	//console.log("bot " + bot);
	//console.log("top " + top);
return !( right || left || bot || top);
}
function isTouching(x,y, r2){
    if(x > r2.x && x < r2.x + r2.width && y > r2.y && y < r2.y + r2.height) return true;
    return false;
}


function map(x, x_min, x_max, x_min_new, x_max_new){
	var pct = (x - x_min) / (x_max - x_min);
	return (pct * (x_max_new-x_min_new) + x_min_new);
}
function getRandomTop(){
	var pos = new PVector(getRandomArbitrary(-stage.width*0.1, stage.width*1.1), -stage.height*0.1)
	return pos;
}
function getRandomLeft(){
	var pos = new PVector(-stage.width*0.1, getRandomArbitrary(-stage.height*0.1, stage.height*1.1))
	return pos;
}
function getRandomRight(){
	var pos = new PVector(stage.width*1.1, getRandomArbitrary(-stage.height*0.1, stage.height*1.1))
	return pos;
}
function getRandomBot(){
	var pos = new PVector(getRandomArbitrary(-stage.width*0.1, stage.width*1.1), stage.height*1.1)
	return pos;
}
function getRandomBorder(){
	switch(getRandomInt(1, 5)){
		case 1:
			return getRandomTop();
			break;
		case 2:
			return getRandomLeft();
			break;
		case 3:
			return getRandomRight();
			break;
		case 4:
			return getRandomBot();
			break;
		default:
			return getRandomTop();
			break;
	}
}
function lock(theta){
	while(theta > 2*PI) theta -= 2*PI;
	while(theta < 0) theta += 2*PI;
	return theta;
}
function lock_x(pos){
	return (pos < 0) ? 0 : 	(pos > width)? width : pos;
}
function lock_y(pos){
	return (pos < 0) ? 0 : 	(pos > ground)? ground : pos;
}
// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b){
	// Vector from a to p
  var ap = PVector.sub(p, a);
  // Vector from a to b
  var ab = PVector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  var normalPoint = PVector.add(a, ab);
  return normalPoint;
}
// note: crossproduct - 0 on the line, +1 on one side, -1 on other side
function isBetween(p, a, b){
  var crossproduct = (p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y);
  if (Math.abs(crossproduct) > 1) return false;
  var dotproduct = (p.x - a.x) *(b.x - a.x) + (p.y - a.y) * (b.y - a.y);
  var squaredlengthba = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
  if (dotproduct < 0) return false;
  if ( dotproduct > squaredlengthba) return false;
  return true;
} // end isBetween
function crossproduct(p, a, b){
	return ((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y));
}

function applyForce(force) {
    // We could add mass here if we want A = F / M
    //console.log(this);
    //console.log("this.accel: ");
    //console.log(this.accel);
    this.accel.add(force);
  }

function simulateMouseEvent (event, simulatedType) {
        //console.log(event)
    // Ignore multi-touch events
    if (event.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');

    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles
      true,             // cancelable
      window,           // view
      1,                // detail
      touch.screenX,    // screenX
      touch.screenY,    // screenY
      touch.clientX,    // clientX
      touch.clientY,    // clientY
      false,            // ctrlKey
      false,            // altKey
      false,            // shiftKey
      false,            // metaKey
      0,                // button
      null              // relatedTarget
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }
function arrayContains(array, item){
	var index = array.indexOf(item);
	if(index < 0) return false;
	return true;
}
var convertTime = function(time){
    t = '' + (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
    return t;
}
function print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}
function sortByKeySmall(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
function search_array(array,key,valuetofind) {
    for (i = 0; i < array.length; i++) {
        if (array[i][key] === valuetofind) {
            return i;
        }
    }
    return -1;
}
function sameSign(n1,n2){
  return (n1 * n2) > 0;
}
Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/(base ? log(base) : 1);
  };
})();

Array.prototype.unique2 = function()
{
  var n = {},r=[];
  for(var i = 0; i < this.length; i++)
  {
    if (!n[this[i].id])
    {
      n[this[i].id] = true;
      r.push(this[i]);
    }
  }
  return r;
}
// re-cycle an existing object by restoring it to an empty object like {}
var wipe = function (obj){
    for (var p in obj){
        if (obj.hasOwnProperty(p))
            delete obj[p];
    }
};