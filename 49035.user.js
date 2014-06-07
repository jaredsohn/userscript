// ==UserScript==
// @name				DS1Spy
// @author				Heinzel
// @namespace			http://userscripts.org
// @description			Fuegt in jedem Versammlungsplatz 1 Spy grundsaetzlich ein
// @include			http://*staemme*game.php?*screen=place*
// @exclude			*try=confirm*
// @exclude			*mode=units*
// @exclude			*mode=sim*
// @exclude			*mode=neighbor*
// ==/UserScript==



(function main() {
	var spy_len = 1;
	
	if(document.getElementsByName("spy").length > 0) {
		document.getElementsByName("spy")[0].value = spy_len;
	}
})();