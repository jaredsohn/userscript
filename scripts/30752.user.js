// FINANCE.CZ Ad Blocker
// version 0.1 BETA!
// 2008-07-29
// Copyright (c) 2008, Radoslav Bielik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 
//
// ENGLISH
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// To uninstall, go to Tools/Manage User Scripts,
// select "FINANCE.CZ Ad Blocker", and click Uninstall.
//
// SLOVAK
// Toto je skript pre Greasemonkey (Firefox addon)
//
// Pre nainstalovanie je potrebny Greasemonkey: http://greasemonkey.mozdev.org/
// Po instalacii Greasemonkey restartujte Firefox a znova otvorte tento skript.
// Pre odinstalovanie otvorte Tools/Manage User Scripts,
// zvolte "FINANCE.CZ Ad Blocker" a kliknite "Uninstall"
//
// 
//
// ==UserScript==
// @name FINANCE.CZ Ad Blocker
// @namespace http://bielik.org
// @description Skript na blokovanie grafickych reklam na serveri FINANCE.CZ, ktore robia text necitatelnym. Bez tohoto skritpu nie je v prehliadaci Firefox mozne citat niektore spravy servera FINANCE.CZ, kedze reklama prekryva text spravy, a nie je mozne ju uzavriet. Tento skript teda neblokuje vsetky reklamy, iba skryva tuto nevhodne umiestnenu reklamu, pokial je na stranke pritomna. Redakcia FINANCE.CZ bola na uskutocneny fakt upozornena prostrednictvom kontaktneho formulara, no tato chyba dodnes nebola odstranena. Pokial bude chyba napravena, tak tento skript strati opodstatnenie a bude z katalogu skriptov odstraneny.
// @include http://*.finance.cz/zpravy/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");

for(var i in divs)
{
	if(divs[i].className == "fl-ad ad")
	{
		divs[i].style.display = "none";
		break;
	}
}
