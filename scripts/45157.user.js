// A Selfish World
// version 1
// 2009-3-24
// Copyright (c) 2009, Peter Swire
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
// select "Unstyle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          A Selfish World
// @description   Removes the share banner from A Softer World
// @include       http://www.asofterworld.com/*
// @include       http://asofterworld.com/*
// ==/UserScript==


// The path to the little share bar
var xpath = "/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr/td/font/span/font/table/tbody/tr/td[2]";

var allbar = document.evaluate( xpath,
    							document,
							    null,
							    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
							    null);



for (var i = 0; i < allbar.snapshotLength; i++) {
	sharebar = allbar.snapshotItem(i);
	if(sharebar){
		sharebar.parentNode.removeChild(sharebar);
	}
}


