// ==UserScript==
// @name           TW WEEKBLAD; Ingelogd - Onderaan
// @namespace      Infinitum
// @description    Ingame linkjes naar het ADMIN gedeelte het Weeklbad
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

var lnk = "http://community.tribal-wars.nl/tww/admin.php";
if (document.location.href.indexOf(".tribalwars.nl/game.php") != -1) 
{
		var navBar = document.getElementById('footer_left');
		var twwLink = document.createElement('span');
		twwLink.innerHTML = " - <a target=\"_blank\" href=\"" + lnk + "\">TWw Admin</a>";
	
		navBar.appendChild(twwLink);
}
