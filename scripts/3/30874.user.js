// Custom Sticker
// version 0.2a
// 2008-07-31
// by Diego De Vita
//
// ==UserScript==
// @name          Custom Sticker
// @description   stick crosses on web pages for reference
// @include       *
// ==/UserScript==

var stickies = [];
var enabled = false;
var keyPressed = 'X';
var counter = 0;
var mouseX = 0;
var mouseY = 0;

function MySticky(x,y,obj){
	this.x = x;
	this.y = y;
	this.obj = obj;
}

function onmousemoveHandler(e) {	
	mouseX = e.pageX;
	mouseY = e.pageY;
	if (mouseX < 0){mouseX = 0;}
	if (mouseY < 0){mouseY = 0;}  
	return true;
}

function onclickHandler() {		
	if (enabled) {
		if (keyPressed == 'delete') {
			removeStickies(mouseX,mouseY);
		} else {	 		
	 		addSticky(mouseX,mouseY,keyPressed);
	 	}
	}
}

function onkeydownHandler(e){	
	if (e.keyCode == 17){
		enabled = true;
		keyPressed = 'delete';
	}
}

function onkeypressHandler(e){
	enabled = true;	
	keyPressed = String.fromCharCode(e.charCode);
}

function onkeyupHandler(e) {
	enabled = false;	
}

function addSticky(x,y,content) {
	var xDiv = x-5;
	var yDiv = y-10;	
	var divName = 'sticky'+getRnd();
	var divStyle = 'position: absolute;top: ' + yDiv + 'px; left: ' + xDiv + 'px; color: red; font-family: Arial Black;font-weight: bold;';	
	var newDiv = document.createElement('div');	
	newDiv.setAttribute('id',divName);	
	newDiv.setAttribute('style',divStyle);
	newDiv.appendChild(document.createTextNode(content)); 		
	document.body.appendChild(newDiv);
	stickies[stickies.length] = new MySticky(xDiv,yDiv,newDiv);
}

function removeStickies(x,y){
	for (i=0;i<stickies.length;i++){
		var s = stickies[i];		
		var margin = 20;
		if (x > s.x && x < s.x+margin && y > s.y && y < s.y+margin) document.body.removeChild(s.obj);		
	}
}

function getRnd() {
	var rand_no = Math.random();
	rand_no = rand_no * 10000;
	rand_no = Math.ceil(rand_no);
	return rand_no;
}

window.addEventListener('click',onclickHandler,true);
window.addEventListener('mousemove',onmousemoveHandler,true);
window.addEventListener('keydown',onkeydownHandler,true);
window.addEventListener('keypress',onkeypressHandler,true);
window.addEventListener('keyup',onkeyupHandler,true);
