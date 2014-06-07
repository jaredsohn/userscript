// ==UserScript==
// @name           Weg met Darren (de smiley dan)
// @namespace      blaaa
// @description    Verander Darren in ;D
// @include        http://www.gmot.nl/*
// ==/UserScript==

var items = document.getElementsByTagName("img");
var total = items.length;
if (total > 0) {
	for (var i = 0; i < total; i++) {
		if (items[i].src == "http://updo.nl/file/601a0cf1.png") {
			items[i].src="http://www.gmot.nl/Smileys/default/grin.gif";
		}
	}
}