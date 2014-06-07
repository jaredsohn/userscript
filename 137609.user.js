// ==UserScript==
// @name        Maedchenflohmarkt
// @namespace   http://www.maedchenflohmarkt.de/
// @description Remove facebook modal dialog from maedchenflohmarkt.de
// @include 	http://www.maedchenflohmarkt.de/*
// @version     1.0
// ==/UserScript==

if ("www.maedchenflohmarkt.de" == document.domain) {
	document.getElementById("fancybox-overlay").setAttribute("style", "");
	document.getElementById("fancybox-wrap").setAttribute("style", "");
}