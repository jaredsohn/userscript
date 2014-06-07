// ==UserScript==
// @name	2chan Imagerelinker
// @description	changes redirect-links into direct links (links with filename only; Images still redirect)
// @author	UORasputin
// @include	http://*.2chan.net/*
// ==/UserScript==


var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
	if (links[i].href.match(/red/) && links[i].textContent.match(1)) {
		links[i].href = "src/" + links[i].textContent;
	}
}