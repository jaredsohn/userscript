// ==UserScript==
// @name	    Megaupload Direct Download
// @version     1.0
// @description	version 1.0. Ce script va permettre de ne plus attendre 25 ou 45sec sur Megaupload et clic automatique sur Telechargement Regulier et esquive aussi les popups pubs de Megaupload. Script cree par majax31. Fonctionne pour FireFox, Opera et Chrome.
// @namespace   Script cree par majax31 . Fonctionne pour FireFox, Opera et Chrome.
// @include     http://www.megaupload.com/?d=*
// ==/UserScript==

show();

function show()
{
	var downloadcounter = document.getElementById("downloadcounter");
	downloadcounter.setAttribute("style", "display:none");

	var downloadlink = document.getElementById("downloadlink");
	downloadlink.setAttribute("style", "display:block");
	downloadlink.childNodes[0].setAttribute("onclick", "");
    document.getElementsByClassName("table_div_b")[4].innerHTML = "<strong style=\"color: green;\">Aucune Pub - No Ads !<br>antipubchrome.org<br> antipubfirefox.org</strong>";
	document.getElementsByClassName("table_div_b")[5].innerHTML = "<strong style=\"color: green;\">Aucun :)</strong>";
}

(function() {document.location = document.getElementById('downloadlink').firstChild.href;})();

