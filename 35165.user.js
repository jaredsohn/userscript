// WSJ.com automatic print mode
// version 0.1
// Oct 8, 2008
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
// select "Google Secure Pro", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WSJ.com automatic print mode
// @include       http://online.wsj.com/article/*
// ==/UserScript==
//

location.href = location.href.replace(/\.html$/, '.html?#printMode');

