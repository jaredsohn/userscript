// ==UserScript==
// @name        Anti-Premiumbutton
// @namespace   Grepolis
// @description Entfernt den störenden Premium-Button und passt das Menü entsprechend an.
// @include     http://*.grepolis.*/game/index*
// @version     1
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$ (function () {
	function Ersetzen () {
		var Breite = $ ("div#main_menu div.options_container div.border_middle");
		if (! Breite.length)
			window.setTimeout (Ersetzen, 1);
		Breite = Breite.css ("width");
		Breite = /(\d+)(.*)/.exec (Breite);
		$ ("div#main_menu div.options_container div.border_middle").remove ();
		$ ("div#main_menu").css ("width", "-=" + Breite [1] + Breite [2]);
		$ ("div#main_menu").css ("margin-left", "+=" + (Breite [1] / 2) + Breite [2]);
	}

	Ersetzen ();
});

