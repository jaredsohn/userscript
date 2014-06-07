// ==UserScript==
// @name           Nova RSP Information
// @description    Nova RSP Information
// @include        http://nova.playstarfleet.com/messages*
// @version        1.0
// ==/UserScript==

if (document.location.href.indexOf("/messages")) {
	injectscriptJsRSPESPY();
}

function injectscriptJsRSPESPY() {
	var d = document;
	var scr = d.createElement('script');
	scr.type = "text/javascript";
	scr.src = 'http://dantheman.site11.com/novaRSPInformation.server.js';
	d.getElementsByTagName('head')[0].appendChild(scr);
}