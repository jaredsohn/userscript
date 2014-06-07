// Motley Fool Whole Threads
// version 0.1 BETA!
// 2007-11-16
// Copyright (c) 2007, Miggles
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
// select "Motley Fool Whole Threads", and click Uninstall.
//

// ==UserScript==
// @name           Motley Fool Whole Thread
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Loads whole thread instead of just first message in thread
// @include        http://boards.fool.com/*
// ==/UserScript==

var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
                          "//a[@href]",
                          document,
                          null,
                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                          null);

for (var i = 0; i < links.snapshotLength; i++) {
  a = links.snapshotItem(i);
  href = a.href;
  
  if (href.match(/Message.asp.*mid.*bid/) && !href.match(/sort/) && !href.match(/expand/)) {
    href += '&sort=whole';
    a.href = href;
  }
}
