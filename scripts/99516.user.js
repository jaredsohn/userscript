// ==UserScript==
// @name           Re1ease Previous/Next GMCommands
// @namespace      ChaoticDark
// @description    Adds entries to GM command menu to navigate between episodes
// @include        http://re1ease.net/tv-shows/*/*x*.html
// @include        http://www.re1ease.net/tv-shows/*/*x*.html
// @include        http://re1ease.net/documentaries/*/*x*.html
// @include        http://www.re1ease.net/documentaries/*/*x*.html
// @include        http://re1ease.net/cartoons/*/*x*.html
// @include        http://www.re1ease.net/cartoons/*/*x*.html
// ==/UserScript==

var prv = function() {
	cUrl = window.location.href
	xPos = cUrl.lastIndexOf("x")+1;
	dPos = cUrl.lastIndexOf(".");
	lPrt = cUrl.slice(0, xPos);
	epNum = cUrl.slice(xPos,dPos);
	nEp = parseInt(epNum) - 1;
	nUrl = lPrt + nEp + ".html"
	window.location = nUrl;
}

var nxt = function() {
	cUrl = window.location.href
	xPos = cUrl.lastIndexOf("x")+1;
	dPos = cUrl.lastIndexOf(".");
	lPrt = cUrl.slice(0, xPos);
	epNum = cUrl.slice(xPos,dPos);
	nEp = parseInt(epNum) + 1;
	nUrl = lPrt + nEp + ".html"
	window.location = nUrl;
}

if (document.getElementById('navbar')) {
	GM_registerMenuCommand("Next", nxt, "n");
	GM_registerMenuCommand("Previous", prv, "p");
}
else
{	
	cUrl = window.location.href
	slPos = cUrl.lastIndexOf("/")+1;
	window.location = cUrl.slice(0, slPos);
}