// ==UserScript==
// @name        IJK
// @namespace   http://userscripts.org/scripts/show/8671
// @include     *
// @lastUpdate  2007/5/5 0:30
// ==/UserScript==


var SPACE_SCROLL_AMOUNT = 30;
var MARGIN = 10;
var MIN_OBJECT_SIZE = 100;
var IME_OFF = true;

var BUTTON_RIGHT = 2;

var KEY_NEXT = charCode('J');
var KEY_PREVIOUS = charCode('K');
var KEY_SPACE = charCode(' ');


// start by ctrl + right-click
var START_HANDLER = 'click';
function IS_START_EVENT(e){
	return e.ctrlKey && e.button == BUTTON_RIGHT;
}

/*
// start by ctrl + shift + i
var START_HANDLER = 'keydown';
function IS_START_EVENT(e){
	return e.ctrlKey && e.shitKey && e.button == 'I'.charCodeAt();
}

// start by img element double-click
var START_HANDLER = 'dblclick';
function IS_START_EVENT(e){
	return e.target.tagName.toLowerCase() == 'img';
}
*/


// ----[Application]-------------------------------------------------
window.addEventListener(START_HANDLER, onStart, true);

function onStart(e){
	if(!IS_START_EVENT(e)) return;
	
	IME_OFF && imeOff();
	
	window.removeEventListener(START_HANDLER, onStart, true);
	cancel(e);
	
	window.addEventListener('keydown', onKeyDown, false);
	jump(1);
}

function onKeyDown(e){
	if(e.ctrlKey || e.altKey)
		return;
	
	switch(e.keyCode){
	case KEY_SPACE:
		viewTop(viewTop() + (e.shiftKey ? -1 : 1) * SPACE_SCROLL_AMOUNT);
		cancel(e);
		return;
		
	case KEY_NEXT:
		jump(true);
		return;
		
	case KEY_PREVIOUS:
		jump(false);
		return;
	}
}

function jump(next){
	var elms = getElements();
	var op = next ? gt : lt;
	var most = null;
	var border = viewTop();
	
	for(var i=l=elms.length ; i ; i--){
		var elm = elms[next ? l-i : i-1];
		var top = absoluteTop(elm) - MARGIN;
		
		if(
			isTarget(elm) && 
			op(top, border) && 
			(most==null || op(most, top))){
			
			most = top;
		}
	}
	
	viewTop(most);
}

function isTarget(obj){
	return obj.width>=MIN_OBJECT_SIZE && obj.height>=MIN_OBJECT_SIZE;
}

function getElements(){
	return document.images;
}


// ----[Utility]-------------------------------------------------
function log() {
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments))
}

function gt(a, b){return a > b}
function lt(a, b){return a < b}

function absoluteTop(elm, top){
	if(top == null)
		top = 0;
	
	if(!elm)
		return top;
	
	return absoluteTop(elm.offsetParent, top + elm.offsetTop)
}

function viewTop(top){
	var view = document.compatMode=='CSS1Compat' ? 
		document.documentElement : 
		document.body;
	
	return top==null ? view.scrollTop : (view.scrollTop=top)
}

function cancel(e){
	e.preventDefault();
}

function charCode(c){
	return c.charCodeAt();
}

// Original code : http://a-h.parfe.jp/einfach/archives/2006/0905214308.html
function imeOff(){
	var top = viewTop();
	
	var elm = document.body.appendChild(document.createElement('input'));
	elm.type = 'password';
	elm.style.width = '0px';
	elm.focus();
	
	viewTop(top);
	
	document.body.removeChild(elm);
	
	window.blur();
	window.focus();
}
