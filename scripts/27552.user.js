// Removes MCB Forums Side Bar
// version 0.1
// 2008-05-30
// Copyright (c) 2008
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
// To uninstall, go to Tools/Manage User Scripts
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove MCB Forum Sidebar
// @namespace     http://w3.org/1999/xhtml
// @description   Removes the Forum Sidebar for better viewing
// @include	  http://*mcarterbrown.com*
// ==/UserScript==


// -----------------------------------------------------
// THIS GETS RID OF THE SIDE BAR
// -----------------------------------------------------

var allTds, thisTds;

allTds = document.evaluate(
    "//td[@class='peterska']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTds = allTds.snapshotItem(i);

	thisTds.parentNode.removeChild(thisTds)
    // do something with thisTds
}


/*

CHANGE LOG
05-30-2008 - Initial Release

*/