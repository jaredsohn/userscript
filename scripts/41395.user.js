// ==UserScript==
// @name           mods.de - Forentitel
// @namespace      Kambfhase
// @description    Fügt den Forennamen in den Titel ein.
// @include        http://forum.mods.de/bb/board.php*
// ==/UserScript==

var bids = {
	"20":"Cabs",
	"113":"TF2",
	"14":"pOT"
};

var link = document.evaluate("//a[@class='invisible wht']", document, null, 8, null).singleNodeValue;
document.title += " - " + ( bids[ link.href.substr( 38)] || link.textContent);