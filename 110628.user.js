// ==UserScript==
// @name           TW WEEKBLAD; Ingelogd - Bovenaan
// @namespace      Infinitum
// @description    Ingame linkjes naar het ADMIN gedeelte het Weeklbad
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

var lnk = "http://community.tribal-wars.nl/tww/admin.php";
if (document.location.href.indexOf(".tribalwars.nl/game.php") != -1)
{
		var navBar = document.getElementById('menu_row');
		var twwLink = document.createElement('td');
		twwLink.innerHTML = "<a target=\"_blank\" href=\"" + lnk + "\">TWw Admin</a>";
		twwLink.setAttribute('class', 'menu-item');
	
		navBar.appendChild(twwLink);
	

}