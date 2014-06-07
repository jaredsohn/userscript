// ==UserScript==
// @name          Anti - Anonym.to
// @description   Removes anonym.to redirects and links to the real URL
// @include       http://*
// ==/UserScript==

// Find "http://anonym.to/?" and chop the 18 digits off
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anonym.to/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 18));
	}
}