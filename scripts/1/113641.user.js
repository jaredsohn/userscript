// ==UserScript==
// @name Spickmich User Blacklist für Clubs
// @description Erlaubt es dir, alle Beiträge bestimmter Benutzer in allen Clubs auf spickmich.de zu verbergen. 
// @namespace http://userscripts.org/users/269252
// @author Snehonja
// @homepage https://www.userscripts.org/scripts/show/113641
// @include http://*.spickmich.de/club/*/thema/*
// ==/UserScript==

//Hinweis: du musst nicht Name, Nickname UND UserID eines benutzrs eintragen, es reicht immer eines davon.

names = new Array(
// Namen in der freien Zeile eintragen, in anführungszeichen, mit kommata getrennt.
// Beispiel: "Max Mustermann", "Test Mensch", "Foo Bar"

);

nicks = new Array(
// Nicknamen in der freien Zeile eintragen, schema wie bei den namen


);

ids = new Array(
// UserIDs in der freien Zeile eintragen, selben Schema wie oben


)

function isComment(element) {
	if (element.className && element.className=="comment") return true;
	return false;
}

for (i = 0; i < document.links.length; i++) {
    link = document.links[i]
	for (j = 0; j < names.length; j++) {
		if(link.innerHTML == names[j]) {
			element = link.parentNode.parentNode.parentNode
			if (isComment(element)) element.style.display = "none";
		}  	  
	}
	for (j = 0; j < nicks.length; j++) {
	    if (new RegExp("https?://(www\.)?spickmich.de/profil/"+nicks[j]).test(link.href)) {
		    element = link.parentNode.parentNode.parentNode
			if (isComment(element)) element.style.display = "none";
		}
	}
	for (j = 0; j < ids.length; j++) {
	    if (new RegExp("\\<img\\s+src=\"https?://content2.spmi.de/i/\\d+/p/.+/\\d{2}_"+ids[j]+".jpg","m").test(link.innerHTML)) {
		    element = link.parentNode.parentNode.parentNode
			if (isComment(element)) element.style.display = "none";
		}
	}
}
