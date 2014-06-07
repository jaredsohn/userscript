// ==UserScript==
// @name           BackFirst
// @namespace      jvcscripts
// @description    Retour liste des sujets renvoie désormais à la 1ère page
// @include        http://www.jeuxvideo.com/forums/1*
// @include        http://www.jeuxvideo.com/forums/3*
// ==/UserScript==


var tdsListe = document.getElementsByClassName("liste");


for(var i=0; i<tdsListe.length; i++){
	var lien = tdsListe[i].getElementsByTagName("a");
	lien[0].href = lien[0].href.replace(/forums\/26\-([0-9]+)\-[0-9]+\-/, "forums/0-$1-0-");
	lien[0].setAttribute("target", "_self");
}
