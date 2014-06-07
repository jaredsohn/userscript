// ==UserScript==
// @name		YouTube - Hide video recommendations on watch pages
// @include		http://*.youtube.com/*
// @include		https://*.youtube.com/*
// @version		1.0
// @grant		none
// ==/UserScript==

var matches = document.querySelectorAll("span");
for(i = 0; i < matches.length; i++) {
	if(matches[i].innerHTML == "Recommended for you") {
		matches[i].parentNode.parentNode.removeChild(matches[i].parentNode);
	}
}
