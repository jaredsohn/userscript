// Westlaw Window
// Version 0.2
// 2006-08-28
// Copyright (c) 2006, Andrew Flusche
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Westlaw Window", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Westlaw Window
// @namespace      http://www.legalandrew.com
// @description    Converts Westlaw mini-window to new browser window.
// @include        *.westlaw.*
// ==/UserScript==



var allLinks, thisLink;

allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {

    thisLink = allLinks.snapshotItem(i);

    // If link is to a Westlaw "/find/" use a new window.
    if (thisLink.href.search(/\/find\//i) >= 0) {
        thisLink.href = "javascript:void window.open('" + thisLink.href + "')";
    }
}

// Change log
//
// .1 - 2006-08-28 - Initial version
// .2 - 2006-09-06 - Made search case insensitive