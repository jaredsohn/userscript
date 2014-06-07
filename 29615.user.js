// isoHuntSpectrumSecure
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
// select "isoHuntSpectrumSecure", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          isoHuntSpectrumSecure
// @namespace     https://isohunt.com
// @description   use isoHunt, TorrentBox, and Podtropolis' secure connection
// @include       http://*torrentbox.com*
// @include	  http://*podtropolis.com*
// @include	  http://*isohunt.com*
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');