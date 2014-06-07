// version 0.1 2006-02-10
// Copyright (c) 2006, Jeremy Dunck
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Hotmail Not Today
// @namespace      http://dunck.us/code/greasemonkey
// @description    When Hotmail puts you on the Today (a.k.a. marketing crap) page, change to the Inbox.
// @include        http://*.hotmail.msn.com/*
// ==/UserScript==

function getMailLink() {
  for (var i=0,link;link=document.links[i];i++) {
    if (link.innerHTML == 'Mail') {
      return link;
    }
  }
}

if (document.title == 'MSN Hotmail - Today') {
  window.location = getMailLink().href;
}