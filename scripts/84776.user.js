// ==UserScript==
// @name	Keine Werbung
// @author	Homer Bond 005
// @include	http://www.schuelervz.net/*
// ==/UserScript==

var adtop = document.getElementById("Grid-Advertising-Top");
var adparent = adtop.parentNode;
var adright = document.getElementById("Grid-Advertising-Right");
adparent.removeChild(adtop);
adparent.removeChild(adright);