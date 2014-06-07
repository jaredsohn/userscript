// ==UserScript==
// @name          Reddit openner
// @namespace     http://jeffpalm.com/reddit
// @description	  Open reddit articles inline
// @include       http://*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.3;
var WIDTH = 700;                 // the width of the new window
var HEIGHT = 700;                // the height of the new window
var es2closeLinks = new Array(); // list of the 'close' elements
var opennedElement = 0;          // the currently openned element, we'll only have one
var isShiftPressed = false;      // only do this if shift is pressed

function onMouseover(_a,_id) {
	var a = _a;
	var id = _id;
	return function(e) {

		// shift must be pressed
		if (!isShiftPressed) return;

		// only have one open at a time
		if (opennedElement != 0) hide(opennedElement);

		// if there is another window open, close it

		// the new iframe
		var iframe = document.createElement("iframe");
		iframe.id = id;
		iframe.width = 0;
		iframe.height = 0;
		iframe.display = "none";

		// add the close element
		var close = document.createElement("a");
		close.appendChild(document.createTextNode(" [close]"));
		close.addEventListener('click',function (e) {hide(iframe);},true);
		es2closeLinks[iframe] = close;
		a.appendChild(close);
		
		// add the iframe
		a.appendChild(iframe);

		var href = a.href;
		iframe.src = href;
		show(iframe);
		
		return false;
	};
}

/**
 * Hides the iframe 'el'.
 */
function show(el) {
	el.width = WIDTH;
	el.height = HEIGHT;
	el.style.display = "inline";
	opennedElement = el;
}

/**
 * Shows the iframe 'el'.
 */
function hide(el) {
	if (!el) return;
	if (!el.parentNode) return;
	close = es2closeLinks[el];
	el.parentNode.removeChild(close);
	el.parentNode.removeChild(el);
	opennedElement = 0;
}


function main() {

	// switch the onclick attribute for these guys
	var as = new Array();
	var links = document.getElementsByTagName("a");
	for (i=0; i<links.length; i++) {
		as.push(links[i]);
	}
	for (i=0; i<as.length; i++) {
		var a = as[i];
		var id = "_iframe_" + i;
		a.addEventListener('mouseover',onMouseover(a,id),true);
	}

	// watch for key presses
	function keyDown(e) {
		if (e.keyCode == 86) isShiftPressed = true;
	}
	function keyUp(e) {
		if (e.keyCode == 86) isShiftPressed = false;
	}
	window.addEventListener('keydown', keyDown, true);
	window.addEventListener('keyup', keyUp, true);

}

main();

