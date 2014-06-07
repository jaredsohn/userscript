// Piilottaa häiritsevät tiedoteet kurssigraafin päältä.

// Toimii ainakin FireFox selaimen ja Grease Monkey lisäosan kanssa.
// Grease Monkeyn voi ladata tästä:
// https://addons.mozilla.org/en-US/firefox/addon/748

// ==UserScript==
// @name         TiedotteetPiiloon
// @namespace    KLTiedotteetPiiloon
// @description  Piilottaa tiedotteet kurssigraafista
// @include      http://www.kauppalehti.fi/*
// ==/UserScript==


window.addEventListener("load", function(e) {
	window.setTimeout("if (window.amStock) amStock.hideEvents();", 3000);
}, false);
