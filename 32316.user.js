// Bunefi written for Lifehacker by brian@bunedoggle.com
// version 0.1
// 2008-08-22
// Copyright (c) 2008, Brian Bailey, Bunedoggle
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
// select "bunefi", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bunefi
// @namespace     http://bunedoggle.com/
// @description   This script can help you get free wifi at some hotspots
// @include       *
// ==/UserScript==

var links;

links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
links[i].setAttribute('href' , links[i].getAttribute('href')+"?.jpg");
}

