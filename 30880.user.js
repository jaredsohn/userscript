// Counter Sticker
// version 0.1a
// 2008-07-31
// by Diego De Vita
//
// ==UserScript==
// @name          Counter Sticker
// @description   stick incremental numbers across web pages for reference
// @include       *
// ==/UserScript==

var enabled = false;
var counter = 0;
var mouseX = 0;
var mouseY = 0;

function onmousemoveHandler(e) {	
	mouseX = e.pageX;
	mouseY = e.pageY;
	if (mouseX < 0){mouseX = 0;}
	if (mouseY < 0){mouseY = 0;}  
	return true;
}

function onclickHandler() {		
	if (enabled) addSticky(mouseX,mouseY,++counter);	
}

function onkeydownHandler(e){	
	if (e.keyCode == 17) enabled = true;
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
window.addEventListener('keyup',onkeyupHandler,true);
