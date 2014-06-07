// ==UserScript==
// @name          zeit.de print version
// @namespace
// @description   Directly link to the print version of zeit.de articles
// @include       http://www.zeit.de/*
// ==/UserScript==
//
// Modified from zeit.de full article by Manuel Seeger

var link = null;
var pattern = /.*\/[0-9]{4}\/[0-9]{2}\/.*/;
for (var i = 0; i < document.links.length; ++i) {
	link = document.links[i];
	if (pattern.test(link.href)) {
		href = link.href;
		if (href = href.replace(/www\.zeit\.de/g, 'zeus.zeit.de/text')){
			link.href = href;
		}
	}
}


