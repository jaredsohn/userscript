// ==UserScript==
// @name           SoiniFree
// @namespace      http://userscripts.org/users/326701
// @description    Poistaa Soinista ja PerSuista kertovat uutiset hs.fi etusivulta
// @include        http://www.hs.fi/*
// ==/UserScript==

var bannedWords = [
	"Soini",
	"Perussuo",
	"perussuo",
	"Hakkarai",
	"Halla-Ah"
];

var divList = document.getElementsByTagName('div');

for(i = 0; i < divList.length; i++) {
	if(divList[i].getAttribute('class') == "contentNewsItem") {
		heading = divList[i].getElementsByTagName('h1');
		if(heading.length == 0) {
			heading = divList[i].getElementsByTagName('h2');
		}
		link = heading.item(0).getElementsByTagName('a');
		text= link[0].childNodes[0].nodeValue;
		
		for(u = 0; u < bannedWords.length; u++) {
			if(text.indexOf(bannedWords[u]) != -1) {
				divList[i].setAttribute('style', 'visibility: hidden;');
			}
		}
	}
}