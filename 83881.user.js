
// Reddit Imgur Fix
// version 0.1
// 2010-08-17
// Copyright (c) 2010, Ryan Morrow
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
// select "Reddit Imgur Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Reddit Imgur Fix
// @namespace     
// @description   Replaces incorrect imgur.com links with http://i.imgur.com/abcde.jpg format
// @include       http://www.reddit.com/*
// ==/UserScript==

var a, links;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	a = links[i];
	if (a.host.indexOf("imgur.com")!=-1) {
		a.href = "http://i.imgur.com" + a.href.substr(a.href.lastIndexOf("/"),6) + ".jpg";
	}
}

//
// ChangeLog
// 2010-08-17 - 0.1 - started from an example script
//
