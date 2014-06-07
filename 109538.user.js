// ==UserScript==
// @name           Farm en AM links
// @namespace      RuneRifle
// @version        1.1
// @description    Farm en AM plaatjes verwijderen en de links verplaatsen.
// @include        http://nl*.tribalwars.nl/game.php*
// ==/UserScript==

// Copyright RuneRifle - 2011

var AMloc = 1; // Account Manager link: 0=Zichtbaar | 1=Bovenste balk | 2=Onderste balk | 3=Niet zichtbaar
var Farmloc = 2; // Farm-Assistent link: 0=Zichtbaar | 1=Bovenste balk | 2=Onderste balk | 3=Niet zichtbaar

var farmlink = document.location.href + "&screen=am_farm";
var amlink = document.location.href + "&screen=accountmanager";

var classes = document.getElementsByClassName("manager_icon");

if (AMloc == 1)
{
	classes[1].style.display = "none";
	var navBar = document.getElementById('menu_row');
	var am = document.createElement('td');
	am.innerHTML = "<a href=\"" + amlink + "\">Account Manager</a>";
	am.setAttribute('class', 'menu-item');

	navBar.appendChild(am);
}
if (AMloc == 2)
{
	classes[1].style.display = "none";
	var navBar = document.getElementById('footer_left');
	var am = document.createElement('span');
	am.innerHTML = " - <a href=\"" + amlink + "\">Account Manager</a>";

	navBar.appendChild(am);
}
if (AMloc == 3)
{
	classes[1].style.display = "none";
}

if (Farmloc == 1)
{
	classes[0].style.display = "none";
	var navBar = document.getElementById('menu_row');
	var farm = document.createElement('td');
	farm.innerHTML = "<a href=\"" + farmlink + "\">Farm Assistent</a>";
	farm.setAttribute('class', 'menu-item');

	navBar.appendChild(farm);
}
if (Farmloc == 2)
{
	classes[0].style.display = "none";
	var navBar = document.getElementById('footer_left');
	var farm = document.createElement('span');
	farm.innerHTML = " - <a href=\"" + farmlink + "\">Farm Assistent</a>";

	navBar.appendChild(farm);
}
if (Farmloc == 3)
{
	classes[0].style.display = "none";
}