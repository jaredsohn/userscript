// Craigslist ads linkifier
// version 0.2
// 2006-10-21
// Copyright (c) 2006, Roy M. Silvernail
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
// select "Craigslinker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Craigslinker
// @namespace     http://www.rant-central.com/greasemonkey/
// @description   create links from Craigslist "full-text-mode" page faux addresses 
// @include       http://*craigslist.org/*
// @exclude       
// ==/UserScript==

var baseLoc;
baseLoc = document.location.href;
baseLoc = baseLoc.substring(0,baseLoc.lastIndexOf('/'));
if(document.location.href.match('displayMode=printFriendly')) {
	var allDefLists, thisDefList;
	allDefLists = document.getElementsByTagName('dt');
	for (var i = 0; i < allDefLists.length; i++) {
		thisDefList = allDefLists[i];
		thisDefList.innerHTML = thisDefList.innerHTML.replace(/(anon-(\d+)@craigslist.org)/,'<a href="'+baseLoc+'/$2.html">$1</a>');
	}
}
