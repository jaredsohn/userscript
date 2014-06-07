// ==UserScript==
// @name           remove yahoo sponsoren links (de)
// @namespace      http://de.search.yahoo.com/*
// @description    entfernt die Sponsorenlinks von de.search.yahoo.com. Funktioniert zzt. nur mit der Werbung rechts.
// @include        http://de.search.yahoo.com/*
// ==/UserScript==

//var paragraphs = document.getElementsByTagName("p");
var paragraphs = document.getElementsByTagName("div");

for (var i = 0; i < paragraphs.length; i++) {
//	if (paragraphs[i].innerHTML == "Ads from Yahoo!") {
	if (paragraphs[i].innerHTML == "SPONSOREN-LINKS") {
		paragraphs[i].parentNode.style.display = "none";
	}
}


