// ==UserScript==
// @name           SingleChrist.de: Normale Links in Suchergebnissen
// @description    Zeigt in den Suchergebnissen normale Links an.
// @include        http://*singlechrist.de/*
// ==/UserScript==

var regExp = /(?:javascript\:popUpScrollWindow2\(\')(\/\w+\.htm)(?:\'\,\'\w+\'\,\w+\,\w+\))/;
var allLinks = document.getElementsByTagName('a');

for (var i = 0; i < allLinks.length; i++) {
	thisLink = allLinks[i];
	if (thisLink.href.match(regExp)) {
		thisLink.href = thisLink.href.replace(regExp, '$1');
	}
}
