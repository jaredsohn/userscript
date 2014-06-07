
// Test Log
// version 0.2 BETA!
// 2005-05-02
// Copyright (c) 2005, Mark Pilgrim
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
// select "Test Log", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Test Log
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   example script to test GM_log function
// @include       *
// ==/UserScript==
var allLinks, thisLink; allLinks = document.evaluate(
'//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) { thisLink = allLinks.snapshotItem(i); // do something with thisLink
}
