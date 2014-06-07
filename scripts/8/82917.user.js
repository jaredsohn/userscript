// ==UserScript==
// @name           Youtube disable subscription autoplay
// @namespace      http://miff.furopolis.org/
// @include        http://www.youtube.com/watch?*feature=sub*
// ==/UserScript==

var rx = /[\?&]v=(.+?)(&.*)?$/;
if (rx.test(window.location.search)){
	var matches = rx.exec(window.location.search);
	if (matches[1]) window.location.search = "?v=" + matches[1];
}
