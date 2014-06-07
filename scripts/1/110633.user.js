// ==UserScript==
// @name           TW WEEKBLAD; Ingelogd - Bovenaan²
// @namespace      Infinitum
// @description    Ingame linkjes naar het Weeklbad
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

var lnk = "http://community.tribal-wars.nl/tww/";
if (document.location.href.indexOf(".tribalwars.nl/game.php") != -1)
{
		var navBar = document.getElementById('menu_row');
		var twwLink = document.createElement('td');
		twwLink.innerHTML = "<a target=\"_blank\" href=\"" + lnk + "\">TW Weekblad</a>";
		twwLink.setAttribute('class', 'menu-item');
	
		navBar.appendChild(twwLink);
	

}