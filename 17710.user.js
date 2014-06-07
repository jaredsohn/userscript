// ==UserScript==
// @name           feministe
// @namespace      feministe.us
// @description    feministe hide non-blog elements
// @include        http://www.feministe.us/blog/*
// ==/UserScript==

var area1 = document.getElementById('sidebar1');
var area2 = document.getElementById('sidebar2');

// recent comments
if(area1){ // if exists, hide it
	area1.style.visiblity = "hidden";
	area1.style.display = "none";
} 

// ads
if(area2){ // if exists, hide it
	area2.style.visiblity = "hidden";
	area2.style.display = "none";
}