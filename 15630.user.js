// ==UserScript==
// @name           No Commercial links on Google Search
// @namespace      http://olivier.jeulin.free.fr/scripts
// @description    Suppression des liens commerciaux sur les recherches Google
// @include        http://www.google.*/search?*
// ==/UserScript==

if (document.getElementById("mbEnd")) {
	var comm_link = document.getElementById("mbEnd");
	//comm_link.style.visibility="hidden";
	comm_link.innerHTML='\<tr\>\<td style\=\"padding: 15px 5px; font-size:15px;color:#CCC;text-align:center;\">Pas de pub ici !\<\/td\>\<\/tr\>';
	}
if (document.getElementById("tads")) {
	var tads_link = document.getElementById("tads");
	tads_link.style.display="none";
	}