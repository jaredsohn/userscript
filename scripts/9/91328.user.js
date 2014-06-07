// ==UserScript==
// @name           IT2 - Antivotingbox
// @namespace      de
// @description    Zeigt statt allen Links nur noch ein globalen Link an um den AJAX-Request abzuschicken, Verlinkungen der Votes werden nicht mehr geladen.
// @include        http://www.itycoon2.de/*
// @exclude        http://chat.beta.itycoon2.de/*
// @author         eXidys
// @version        1.1
// @date           06-12-2010
// ==/UserScript==

if(document.getElementsByClassName("box voting")[0] != null) {
	document.getElementsByClassName("box voting")[0].setAttribute("id", "antivote");
	document.getElementsByClassName("box voting")[0].setAttribute("style", "text-align:center;");
	document.getElementsByClassName("box voting")[0].innerHTML = '<p class="small"><a onclick="vote_for(1);vote_for(3);vote_for(4);vote_for(5);vote_for(6);vote_for(7); $(\'#antivote\').hide(\'\');">Anklicken und Geld einsacken.</a></p>';
};


/* Changelog: V1.1 Link wird jetzt zentriert */