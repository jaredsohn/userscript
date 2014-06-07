// ==UserScript==
// @name           StudiVZ ohne Yahoo Suche
// @namespace      lorenzk
// @description    Entfernt das Yahoo "Web" Suchfeld und die "Top Suche"
// @include        http://*.studivz.net/*
// ==/UserScript==

// Die Tabs überm Suchfeld ausblenden
var x = document.getElementById("studivz_tab");
x.style["display"] = "none";

// Die "Top Suche" ausblenden
var bereich = document.getElementById("allesdrin");
var divs = bereich.getElementsByTagName("div");
for (i = 0; i < divs.length; i++) {
	if(divs[i].className == "yahoo_leftnav") {
		divs[i].style["display"] = "none";
	}
}