// ==UserScript==
// @name          anonym.to Link Remover
// @namespace     anonymto
// @description   Removes anonym.to redirects and links to the real URL
// @include       http://*
// ==/UserScript==

for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anonym.to/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 18));
	} elseif (linkx.href.indexOf("http://www.anonym.to/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));
	}
}