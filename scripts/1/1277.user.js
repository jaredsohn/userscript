
// Businessweek 
// version 0.1 BETA!
// 21-06-2005
// Copyright (c) 2005, Prasad Thammineni
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
// select "BusinessWeek", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Businessweek
// @namespace     http://www.thammineni.net/projects/greasemonkey/
// @description   Rewrites Businessweek.com URLs which have print friendly pages to go directly the print friendly page
// @include       http://*.businessweek.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
var host = 'businessweek.com';
var rewrittenUrl = host + '/print';

var link, first, lastPart, newUrl;

for (var i = 0; i < links.length; i++)
{
	link = links[i];
	if (link.href.match(/content/))
	{
		first = link.href.indexOf(host);
		lastPart = link.href.slice(first + host.length);
		newUrl = "/print" + lastPart
		link.href = newUrl;
	}
}



// end
