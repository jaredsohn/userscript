// TorrentBoxSecure
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
// select "TorrentBoxSecure", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TorrentBoxSecure
// @namespace     https://torrentbox.com
// @description   use TorrentBox's secure connection
// @include       http://*torrentbox.com*
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');