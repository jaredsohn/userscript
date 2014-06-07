// ==UserScript==
// @name        Disable Joowz Marquee
// @namespace   marquee
// @include     http://joowz.com/*
// @version     1
// ==/UserScript==

var scripts = document.getElementsByTagName('script');
var scrGroup;

for (s in scripts) {
	if (scripts[s].src == "http://joowz.com/js/marquee.js") {
		//scripts[s].parentNode.removeChild(scripts[s]);
		scripts[s].nextSibling.nextSibling.innerHTML = "";
	}
}