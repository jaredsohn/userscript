// ==UserScript==
// @name          Zeit.de full article
// @namespace     http://www.manuelseeger.de
// @description   Directly link to the full articles on zeit.de
// @include       http://www.zeit.de*
// ==/UserScript==
var link = null;
var pattern = /.*\/[0-9]{4}\/[0-9]{2}\/(?!bg-).*/;
for (var i = 0; i < document.links.length; ++i) {
	link = document.links[i];
	if (pattern.test(link.href)) {
		link.href = link.href + "?page=all";
	}
}
