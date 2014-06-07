// ==UserScript==
// @name          DHP Tijdconversie
// @namespace     http://dhpforum.nl
// @author        Feroxium
// @description   Script converteert alle AM/PM timetags naar 24h formaat.
// @include       https://*dhpforum.nl/*
// ==/UserScript==

var allHTMLTags = document.getElementsByTagName('*');
for (i=0; i<allHTMLTags.length; i++) {
	if (allHTMLTags[i].className=='published') {
		var timetemp = allHTMLTags[i].innerHTML.slice(-8);
		timetemp = new Date("01/01/2000 " + timetemp);
		allHTMLTags[i].innerHTML = allHTMLTags[i].innerHTML.slice(0,-8) + timetemp.toLocaleTimeString().slice(0,5);
	}
}