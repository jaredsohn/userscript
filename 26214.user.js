// Ninja Video Stealth
// version 0.9
// 2008-05-09
// Copyleft (c) 2008, The Laughing Lizard 
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
// select "Ninja Video Stealth", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ninja Video Stealth
// @description   Removes annoying ads from ninjavideo.net
// @include       http://*.ninjavideo.net/*
// @include       http://ninjavideo.net/*
// ==/UserScript==
//
// --------------------------------------------------------------------
var h = document.getElementById('head');
h.innerHTML = 'Ads and crap removed';
