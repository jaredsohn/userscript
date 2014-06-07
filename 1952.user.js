/*
	By Aanand Prasad (aanand.prasad@gDELETETHISBITRIGHTHEREYESTHISBITmail.com).
	Do what you want with it; I'd appreciate it if you dropped me a line if you
	use it for something just so I can feel good about myself.
	Any horrific problems with it, feel free to email me and I'll cut your face off.
*/

// ==UserScript==
// @name          Regnyouth: Highlight Non-Popup Links
// @namespace     http://www.aanandprasad.com/greasemonkey
// @description	  Highlights album links which aren't of the irritating Javascript popup type.
// @include       http://regnyouth.blogspot.com/*
// ==/UserScript==

(function() {
	topLevel = document.getElementById("main");
	links = topLevel.getElementsByTagName("a");
	
	for (var i=0; i<links.length; i++) {
		if (links[i].href.indexOf("javascript:") == -1) {
			links[i].style.color = "#e50";
		} else {
			links[i].style.color = "#832";
		}
	}
})();