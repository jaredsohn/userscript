// ==UserScript==
// @name           Pennergame Ostereisuche by schickimicky
// @namespace      schickimicky.pennergame.de
// @author         schickimicky
// @description    Findet die Ostereier automatisch und klick sie auch gleich an. (c) by schickimicky
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// ==/UserScript==

if (document.getElementById('easterdiv')){
	var easterEggURL = document.getElementById('easterdiv').getElementsByTagName('a')[0].getAttribute('href');
	GM_openInTab("http://"+window.location.hostname+easterEggURL);
	
}