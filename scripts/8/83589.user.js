// ==UserScript==
// @name           Youtube disable subscription autoplay
// @namespace      http://thps-mods.com/
// @include        http://*.youtube.*/watch?v=*&*
// ==/UserScript==

var rx = /[\?&]v=(.+?)(&.*)?$/;
if (rx.test(window.location.search)){
	var matches = rx.exec(window.location.search);
	if (matches[1]) window.location.search = "?v=" + matches[1];
}
