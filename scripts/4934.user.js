// Times Of India
// version 0.1 BETA!
// 30-07-2006
// Copyright (c) 2006, Murali Balathandapani
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
// select "India Times", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          India Times
// @namespace     http://www.bmuralik.com
// @description   Rewrites timesofindia.indiatimes.com URLs which have print friendly pages to go directly the print friendly page. Based on Prasad Thammineni's Businessweek user script.
// @include       http://timesofindia.indiatimes.com/*
// @include       http://economictimes.indiatimes.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
var host = 'indiatimes.com/articleshow/';

var link, first, lastPart, newUrl, temp;

var show = 0;
for (var i = 0; i < links.length; i++) {
	link = links[i];
	if (link.href.match(/articleshow/))  {
		first = link.href.indexOf(host);
		lastPart = link.href.slice(first + host.length);
		newUrl = "/articleshow/msid-" + lastPart.substring(0, lastPart.indexOf('.')) + ',prtpage-1.cms'
		link.href = newUrl;
	}
}
// end

