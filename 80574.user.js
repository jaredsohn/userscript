// ==UserScript==
// @name           glowsweiber
// @namespace      dwaine
// @include        http://www.verdammtehorde.de/*
// ==/UserScript==
var allHTMLTags = new Array();

var allHTMLTags=document.getElementsByTagName("*");

for (i=0; i<allHTMLTags.length; i++) {

	if (allHTMLTags[i].className=="third column") {
			allHTMLTags[i].style.backgroundImage="url(http://i235.photobucket.com/albums/ee149/vanmaz/dancing.gif)";
	}
	
}