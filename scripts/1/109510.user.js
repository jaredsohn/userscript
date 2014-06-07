// ==UserScript==
// @name           FAAM
// @namespace      Farm Assistent - Account Manager
// @version        1.0 (20110808)
// @description    Iconen Farm Assistent en Account manager verwijderen en links beneden plaatsen
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

// Copyright JaTu - 2011


var lnk1 = "/game.php?screen=am_farm&mode=farm";
var lnk2 = "/game.php?screen=accountmanager";
if (document.location.href.indexOf(".tribalwars.nl/game.php") != -1)
var classes = document.getElementsByClassName("manager_icon");
classes[0].style.display = "none";
classes[1].style.display = "none";
{

	{
		var navBar = document.getElementById('footer_left');
		var FarmAss = document.createElement('span');
		FarmAss.innerHTML = " - <a target=\"_self\" href=\"" + lnk1 + "\">Farm-Assistent</a>";
		navBar.appendChild(FarmAss);

		var navBar = document.getElementById('footer_left');
		var AccMana = document.createElement('span');
		AccMana.innerHTML = " - <a target=\"_self\" href=\"" + lnk2 + "\">Account Manager</a>";
		navBar.appendChild(AccMana);
	}
}