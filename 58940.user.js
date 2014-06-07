// ==UserScript==
// @name           ingame.de sessionwerbungueberspringer
// @namespace      http://userscripts.org/users/26744
// @description    ueberspringt die session-gebundene werbung der ingame.de-foren
// @include        http://starcraft2.ingame.de/forum/*
// ==/UserScript==

// isolates the td containing our destination link
var destTD = document.getElementsByTagName('td')[2];
// isolates the link
var destLink = destTD.getElementsByTagName('a')[0].href;
// looks for the text after the link to...
var destText = destTD.getElementsByTagName('font')[0].innerHTML;
// ... check whether it's actually the site containing the ad.
var Ergebnis = destText.match(/Weiter zur Webseite inStarcraft\.de &gt;&gt;&gt;/);

// if the last check is successful (i.e. Ergebnis not NULL, take us to our previously isolated link.
if(Ergebnis) {
	window.location = destLink;
}