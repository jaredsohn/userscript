// ==UserScript==
// @name            Always Left Aligned 
// @namespace       hemps/leftalign
// @description     Replaces right aligned
// @include         http://uzigaming.net/*
// @include         http://www.uzigaming.net/*
// @version         1.0
// ==/UserScript==



var divs = document.getElementsByTagName('div');
var e;
for(var i=0;i<divs.length;i++) {
	e = divs[i];
	if(e.style.textAlign == "right"){
		e.style.textAlign = "left";
	}
}