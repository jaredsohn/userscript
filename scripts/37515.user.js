// ==UserScript==
// @name           simple autoscroll
// @namespace      *
// @include        *
// ==/UserScript==


var goscrolling = false;
var lastoffset = pageYOffset;

var aktiv = window.setInterval(scroll,150);

function scroll() {
	if (goscrolling == true) {lastoffset = pageYOffset; window.scrollBy(0,1);}
	if (lastoffset == pageYOffset) { goscrolling = false; }
}


function togglescrolling() {
	document.getElementsByTagName("body")[0].focus();
	if (goscrolling == false) { goscrolling = true; }
	else {goscrolling = false; }
}

document.getElementsByTagName("body")[0].addEventListener("dblclick",togglescrolling,true);