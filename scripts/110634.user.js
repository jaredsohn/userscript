// ==UserScript==
// @name           TW WEEKBLAD; Ingelogd - Onderaan²
// @namespace      Infinitum
// @description    Ingame linkjes naar het Weeklbad
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

var lnk = "http://community.tribal-wars.nl/tww/";
if (document.location.href.indexOf(".tribalwars.nl/game.php") != -1) 
{
		var navBar = document.getElementById('footer_left');
		var twwLink = document.createElement('span');
		twwLink.innerHTML = " - <a target=\"_blank\" href=\"" + lnk + "\">TW Weekblad</a>";
	
		navBar.appendChild(twwLink);
}
