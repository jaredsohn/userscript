// ==UserScript==
// @name           blockID
// @tag		   ayanami@mitbbs.com
// @description    Block mitbbs ID
// @include        http://*.mitbbs.com/*
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName('*');
var pattern = /ARod|Beckett/;

for (var i=0; i<allElements.length; i++) {
	thisElement = allElements[i];		
	if (thisElement.className =="jiawenzhang-type" ) {		
		if (thisElement.innerHTML.search(pattern) != -1) {
			thisElement.style.visibility = "hidden";
		}
	}
}