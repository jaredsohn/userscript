// ==UserScript==
// @name            HackForums Broken Image Changer
// @namespace       xerotic/imagechanger
// @description     Removes HF images display.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0
// ==/UserScript==



var imgs = document.getElementsByTagName('img');
var e;
for(var i=0;i<imgs.length;i++) {
	e = imgs[i];
	if(e.src.indexOf('hackforums') != -1) {
		e.style.display="none";
	}
}
