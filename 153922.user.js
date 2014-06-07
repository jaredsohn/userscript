// ==UserScript==
// @name           Show useful HackWii page title
// @namespace      #
// @description    Cut the title of forum thread page on www.HackWii.it to show only the relevant part.
// @include        http://www.hackwii.it/forum*
// @grant          none
// ==/UserScript==

var otitle;
otitle = document.title
if ((otitle.indexOf("www.HackWii.it"))>=0){
	otitle = otitle.replace(/www.HackWii.it Forum .* Leggi argomento - /g," ");
	otitle = otitle.replace(/www.HackWii.it Forum .* Visualizza forum - /g," ");
	document.title = otitle;
}
