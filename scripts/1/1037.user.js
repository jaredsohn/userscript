// ==UserScript==
// @name	AltaLink
// @namespace	http://www.ruinsofmorning.net/greasemonkey
// @description	v0.8 - Remove yahoo.com redirection from AltaVista links.
// @include	http://*.altavista.com/*
// ==/UserScript==

avl = document.links;
for (i = 0; i < avl.length; i++) {
	if (rs = avl[i].href.match(/(?:\/\*\*)(.*?)$/)) {
		avl[i].href = unescape(rs[1]);
		avl[i].removeAttribute("onmouseover");
	}
	if (rs = avl[i].href.match(/(?:\?u=)(.*?)(?:&y=|$)/)) {
		avl[i].href = unescape(rs[1]);
	}
	if (rs = avl[i].href.match(/&yargs=(.*?)$/)) {
		avl[i].href = unescape('http://'+rs[1]);
	}
}
