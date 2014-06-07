// ==UserScript==
// @name          USARMY Gefechtszähler
// @author        Thomas Büning
// @namespace     http://derchaot.bplaced.net
// @description   Zählt die Anzahl der laufenden Gefechte
// @include       http://usarmy.schulterglatze.de/attack/*
// @include       http://usarmy.schulterglatze.de/combat/*
// @include       http://usarmy.schulterglatze.de/combat
// ==/UserScript==
var headline = document.getElementsByClassName("headline")[0];
var oldheadline = headline.innerHTML;

if(oldheadline == "Angriff läuft") {
	var tabelle = document.getElementsByClassName("box_content mitte")[0].getElementsByTagName("table")[0];

	var anzahl = tabelle.getElementsByClassName("links gegner-liste").length;
	var korrekt = anzahl - 1;
	
	if(korrekt == 1) {
		var newdata = oldheadline + " -- Es laeuft " + korrekt + " Gefecht! --";
	} else {
		var newdata = oldheadline + " -- Es laufen " + korrekt + " Gefechte! --";
	}
	headline.innerHTML = newdata;
}