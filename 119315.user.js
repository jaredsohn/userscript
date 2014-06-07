// ==UserScript==
// @name           Remove RuneScape Adverts
// @namespace      thealchemist
// @description    Removes the ads and menu on top of the RuneScape applet
// @include		   http://*.runescape.com/*
// @version        1.0
// @date           2011-11-27
// @creator        thealchemist
// ==/UserScript==

var keep_menu = false;

if (document.URL.indexOf('runescape.com/game.ws') != -1 || document.URL.search('world[0-9]*\.runescape\.com') != -1) {
	element = document.getElementById("top");
	element.parentNode.removeChild(element);
	
	if (keep_menu) {
		element = document.getElementById("menu");
		element.style.top = 0;

		element = document.getElementById("dynamic");
		element.style.top = '40px';
	}
	else {
		element = document.getElementById("menu");
		element.parentNode.removeChild(element);
		
		element = document.getElementById("dynamic");
		element.style.top = '0px';
	}
	
}