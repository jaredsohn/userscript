// ==UserScript==
// @name        白癡youtube
// @namespace   http://www.youtube.com/*
// @include     http://www.youtube.com/*
// @version     1
// ==/UserScript==

function fuckCSS(){
	//alert("start");
	var masthead = document.getElementById("masthead-positioner");
	masthead.style.position = "absolute";
	//alert("DONE");
}

fuckCSS();