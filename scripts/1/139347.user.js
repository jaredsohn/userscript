// ==UserScript==
// @name        Testing
// @namespace   testing Lyran
// @description Lol
// @include     http://lyrania.co.uk/game.php
// @version     1
// ==/UserScript==

Tie = function () {}

Tie.id = function (what) {
	// E.G: Tie.id("mainDiv").innerHTML = "Content";
	return document.getElementById(what);
}
function fireEvent(obj,evt){ // borrowed from http://www.webdeveloper.com/forum/showthread.php?t=161317
	
	var fireOnThis = obj;
	if( document.createEvent ) {
	  var evObj = document.createEvent('MouseEvents');
	  evObj.initEvent( evt, true, false );
	  fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	  fireOnThis.fireEvent('on'+evt);
	}
}

var t;
var started = false;

Tie.load = function () {
	clearTimeout(t);
	t = setTimeout(function () { Tie.load(); }, 100);
	
	var timer = Tie.id("timer").innerHTML.replace("Action Timer: ","");
	//var random = Tie.id("mob").nextSibling.id.replace("bb","");
		
	
		if (parseInt(timer) == 0) {
			if (Tie.id("bb")) {
				fireEvent(Tie.id("bb"),'click');
			} else {
				fireEvent(Tie.id("mob").nextSibling,'click');
			}
		}
	started = true;		
	
}

setTimeout(function () { Tie.funct(); }, 1000);

Tie.funct = function () {
	var go = document.createElement('input');
		go.setAttribute('type','submit');
		go.addEventListener("click", Go, false);
		go.value = "Start/Stop";	
		go.style.width = "100px";			
		go.style.position = "absolute";			
		go.style.top = "1px";			
		go.style.left = "1px";			
		Tie.id("header").appendChild(go);



}

function Go() {
	if (started == true) {
		clearTimeout(t);
		started = false;
	} else {
		Tie.load();
	}

}
