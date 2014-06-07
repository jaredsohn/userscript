// B92 - vesti
// verzija 0.11 BETA
// 2006-02-29
// Copyright (c) 2006, Mladen Jablanovic
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Changelog:
//
// 0.10 Pocetna verzija
// 0.11 Ukljucene sve stranice ispod /info/ (npr. komentari)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "B92 - vesti", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          B92 - vesti
// @namespace     http://radioni.ca/
// @description   Izbacivanje dosadnog tickera
// @include       http://www.b92.net/info/*
// ==/UserScript==

// sklanjamo ticker
var marquees, element;
marquees = document.getElementsByTagName('marquee');
for (var i = 0; i < marquees.length; i++) {
    element = marquees[i];
    for (var j = 0; j < 3; j++) // idemo gore sve do tabele
    	element = element.parentNode;
    element.parentNode.removeChild(element); // izbacujemo celu tabelu
}
