// YouTube Playlist Delete	
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          YouTube Playlist Delete
// @description   Hides playlist div
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// ==/UserScript==

var playlistdiv = document.getElementById('quicklist');
playlistdiv.style.display = 'none';