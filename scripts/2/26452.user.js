// ==UserScript==
// @name          anonymz.com Link Remover
// @description   Removes anonymz.com redirects and links to the real URL
// @include       http://*
// ==/UserScript==

// Find "http://anonymz.com/?" or http://www.anonymz.com/? and delete them from URL
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anonymz.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 20));
	}
	if (linkx.href.indexOf("http://www.anonymz.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 24));
	}
}