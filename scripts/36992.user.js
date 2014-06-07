// 
// RSAllowScroll - Copyright (c) 2008 SSE (The Hackman)
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "RSAllowScroll", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RSAllowScroll
// @namespace     http://the-hackman.blogspot.com
// @description   Shows browser scroll bars when running the RS2 client.
// @include       http://runescape.com/*
// @include       http://*.runescape.com/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//iframe[@scrolling]', // get all iframes with a scrolling tag
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.setAttribute('scrolling','yes');
}

//
// ChangeLog
// 2008-10-15 - 1.0 - First version
//
