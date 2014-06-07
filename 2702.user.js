// BBC 606 message board external links corrector
// version 0.1 BETA!
// 2005-01-21
// Copyright (c) 2005, Adam Karnowka
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "six-o-link", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          six-o-link
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Corrects external links on BBC 606 message boards
// @include       http://www.bbc.co.uk/dna/mb606/*
// ==/UserScript==

var linki = document.getElementsByTagName("a");
for(var a=0;a<linki.length;a++)
{
	if(linki[a].hasAttribute("href"))
	{
		var h =	linki[a].getAttribute("href");
		rExp = /_auto/gi;
		results = h.search(rExp)
		if(results>0)
		{
			results+=8;
			slicer=h.slice(results)
			linki[a].setAttribute("href",slicer);
		}
	}
}