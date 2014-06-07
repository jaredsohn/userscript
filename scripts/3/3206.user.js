// Removes adverts in free4web forums
// version 0.1 BETA!
// 2005-01-21
// Copyright (c) 2006, Adam Karnowka
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          free4free
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Removes adverts in free4web forums.
// @include       http://free4web.pl/*
// ==/UserScript==

var tables = document.getElementsByTagName("table");
rExp = /reklam/gi;
for(var a=0;a<tables.length;a++)
{
		results = tables[a].innerHTML.search(rExp);
		if(results>-1)
		{
			tables[a].parentNode.removeChild(tables[a]);
		}
}