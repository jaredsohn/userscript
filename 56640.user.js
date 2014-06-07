// ==UserScript==
// @name          WalkEd
// @namespace     http://www.cs.uni-magdeburg.de/~vlaube/
// @description	  Leveleditor for "Canvascape - 3D walker"
// @include       http://www.abrahamjoffe.com.au/ben/canvascape/
// @include       http://www.abrahamjoffe.com.au/ben/canvascape/textures.htm
// ==/UserScript==

// version 2 - fixed problems with XPCNativeWrappers (addEventListener doesn't like false as a fourth parameter)
//             http://dunck.us/collab/GreaseMonkeyUserScripts#head-4ac4d1e80f8bbd66bf4f1fbea77ea2390b6a2870

function getLeft(element) {
	var left = element.offsetLeft;
	var parent = element.offsetParent;
	
	while(parent) {
		left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	
	return left;
}

function getTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;
	
	while(parent) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	
	return top;
}

////////////////////////////

function mousemove(e) {
	if(!ismousedown)
		return;
	
	var tile_count_x = mapwidth / unsafeWindow.arena[0].length;
	var tile_count_y = mapheight / unsafeWindow.arena.length;
	
	if(e.pageX >= mapleft && e.pageX <= mapleft+mapwidth &&
			e.pageY >= maptop  && e.pageY <= maptop +mapheight) {
		var x = Math.floor((e.pageX-mapleft)/tile_count_x);
		var y = Math.floor((e.pageY-maptop)/tile_count_y);
		if(x==lastx && y==lasty)
			return;
		lastx=x;
		lasty=y;
		if(value==-1)
			value= unsafeWindow.arena[x][y] = unsafeWindow.arena[x][y]?0:1;
		else
			unsafeWindow.arena[x][y] = value;
		unsafeWindow.initUnderMap();
		unsafeWindow.drawCanvas();
	}
	else {
		//mouseup(e);
	}
}

function mousedown(e) {
	ismousedown=true
}

function mouseup(e) {
	ismousedown=false;
	value=-1;
}

function click(e) {
	mousedown(e);
	mousemove(e);
	mouseup(e);
	lastx=lasty=-1;
}

function save(e) {
	var level = unsafeWindow.arena.toString();
	level+=","+unsafeWindow.playerPos.toString();
	level+=","+unsafeWindow.playerDir.toString();
	level+=","+unsafeWindow.playerPosZ.toString();
	GM_setValue("level", level);
}

function load(e) {
	var level = GM_getValue("level").split(",");
	if(level) {
		for(var i=0; i<100; i++) {
			unsafeWindow.arena[Math.floor(i/10)][i%10] = parseInt(level[i]);
		}
		
		unsafeWindow.playerPos[0] = parseFloat(level[100]);
		unsafeWindow.playerPos[1] = parseFloat(level[101]);
		unsafeWindow.playerDir = parseFloat(level[102]);
		unsafeWindow.playerPosZ = parseFloat(level[103]);
		unsafeWindow.initUnderMap();
		unsafeWindow.drawCanvas();
	}
}

////////////////////////////

var map = document.getElementById("underMap");
var mapleft = getLeft(map);
var maptop = getTop(map);
var mapwidth = map.offsetWidth;
var mapheight = map.offsetHeight;

var ismousedown = false;
var lastx=-1;
var lasty=-1;
var value=-1;

var button1 = document.createElement("input");
button1.type = "button";
button1.value = "Save";
button1.id = "btn_save";
button1.style.position="absolute";
button1.style.top="220px";
button1.style.left="15px";
map.parentNode.insertBefore(button1, map.nextSibling);

var button2 = document.createElement("input");
button2.type = "button";
button2.value = "Load";
button2.id = "btn_load";
button2.style.position="absolute";
button2.style.top="250px";
button2.style.left="15px";
map.parentNode.insertBefore(button2, map.nextSibling);

document.addEventListener("mousedown", mousedown, true);
document.addEventListener("mouseup", mouseup, true);
document.addEventListener("mousemove", mousemove, true);
document.addEventListener("click", click, true);
button1.addEventListener("click", save, true);
button2.addEventListener("click", load, true);
