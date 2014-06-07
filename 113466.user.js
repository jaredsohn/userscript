// Netvibes Refresh Shortcut
// version 0.3
// 2011-09-20
// Copyright (c) 2011, Bartosz Piec
// Released under the MPL license
// http://www.mozilla.org/MPL/
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// If you want, you can configure the Included and Excluded pages in 
//  the GreaseMonkey configuration.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Netvibes Refresh Shortcut", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// It adds a keyboard shortcut (c) to refresh Netvibes RSS feeds.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Netvibes Refresh Shortcut
// @namespace      http://www.dabarto.pl/projects/greasemonkey/netvibes_refresh_shortcut
// @include        http://www.netvibes.com/*
// @include        http://netvibes.com/*
// ==/UserScript==

document.addEventListener("keyup", KeyCheck, true);

function KeyCheck(e) {
  var keyID = (window.event) ? event.keyCode : e.keyCode;
  if (keyID == 67) {
    // c
    document.getElementById('smartreader-feeds-headerRefresh').click();
  }
}