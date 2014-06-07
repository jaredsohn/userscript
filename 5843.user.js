// script to add better link to the brwosing page of immoscout.ch
// version 1.0

// 24.09.2006
// Copyright (c) 2006, Stefan Oderbolz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Browse ImmoScout", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Browse ImmoScout
// @namespace     http://www.readmore.ch
// @description   script to improve the links given to objects (too long, too javascript)
// @include       http://www.immoscout.ch/search/*
// ==/UserScript==

var allLinks = document.getElementsByTagName('a');
var href;
for (var i = 0; i < allLinks.length; i++) {
	var href = allLinks[i].href;
	if (allLinks[i].href.substring(0,20) == 'javascript:GoDetail(') {
		allLinks[i].href = '/search/objdetail.asp?objid=' + allLinks[i].href.substring(href.indexOf('(')+1,href.indexOf(')'));
	}
}