// ==UserScript==
// @name           Fikser kortvalører på Mac
// @namespace      http://userscripts.org/users/38722
// @include        http://nbfdata.bridge.no/*
// ==/UserScript==

function fixsuits() {
	var spades = /\xAA/g;
	var hearts = /\xA9/g;
	var diamonds = /\xA8/g;
	var clubs = /\xA7/g;

	document.body.innerHTML = document.body.innerHTML.replace(spades,"&spades;").replace(hearts,"&hearts;").replace(diamonds,"&diams;").replace(clubs,"&clubs;");
}

window.addEventListener("load", function() { fixsuits() }, false);
