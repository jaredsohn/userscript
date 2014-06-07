// ==UserScript==
// @name          Remove Open Window javascript
// @namespace     http://userscripts.org/users/2397
// @description   remove "Open Window" javascript from wiley.com
// @author        Brice McIver
// @include       http://*.wiley.com/*
// @include       https://*.wiley.com/*
// ==/UserScript==

// Remove "Open Window" javascript
// 2009-08-27
// Copyright (c) 2009, Brice McIver
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Open Window javascript", and click Uninstall.
//
// --------------------------------------------------------------------

var links, a, href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);  
    href = a.href.replace(/javascript:openWindow\('([^']*)\?[^']*'\)/gi, "$1");

    if (href !== a.href) {
        a.href = href;
    }
    
    href = a.href.replace(/javascript:openWindowNoMenu\('([^']*)\&newwindow=true'\)/gi, "$1");
    
    if (href !== a.href) {
        a.href = href;
    }    
}
