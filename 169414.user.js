// ==UserScript==
// @name           IT2 - Antivotingbox
// @namespace      de
// @description    Zeigt statt allen Links nur noch ein globalen Link an um den AJAX-Request abzuschicken, Verlinkungen der Votes werden nicht mehr geladen.
// @include        http://www.itycoon2.de/*
// @exclude        http://chat.beta.itycoon2.de/*
// @updateURL      http://userscripts.org/scripts/source/169414.user.js
// @author         eXidys & orangenkonzentrat
// @version        1.3
// @date           06-02-2013
// ==/UserScript==

//TODO: vote-Anzahl dynamisch

if(document.getElementsByClassName("box voting")[0] != null) {
	document.getElementsByClassName("box voting")[0].setAttribute("id", "antivote");
	document.getElementsByClassName("box voting")[0].setAttribute("style", "text-align:center;");
	document.getElementsByClassName("box voting")[0].innerHTML = '<p class="small"><a onclick="vote_for(1);vote_for(2);vote_for(3);vote_for(4);vote_for(5);vote_for(6);vote_for(7);vote_for(8);vote_for(9);vote_for(10);vote_for(11);vote_for(12);vote_for(13); $(\'#antivote\').hide(\'\');">Anklicken und Geld einsacken.</a></p>';
}


/* Changelog: V1.1 Link wird jetzt zentriert */