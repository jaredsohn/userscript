// Disable WoW Forum Interception
// Version 1.0
// 2006-12-29
// Copyright (c) 2006
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
// select "WoWDeintercept", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          WoWDeintercept
// @description   Script to disable WoW's Forum Link Interception
// @include       http://forums.worldofwarcraft.com/*
// @include       http://forums.wow-europe.com/*
// ==/UserScript==

(function () {
	
	linksToFix = document.evaluate("//a[@onclick]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < linksToFix.snapshotLength; i++) {
	    a = linksToFix.snapshotItem(i);
	    	a.setAttribute("onclick", "");
	    }
	 

})();
