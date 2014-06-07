// isoHuntSecure
// version 0.1
// 2008-07-04
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
// select "isoHuntSecure", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          isoHuntSecure
// @namespace     https://isohunt.com
// @description   use isoHunt's secure connection
// @include       http://*isohunt.com*
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');