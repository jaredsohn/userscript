// CzT AdRemover
// version 0.3
// 2010−07−14
// Copyright (c) 2010, pulpino
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CzT AdRemover", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name CzT AdRemover
// @description Remove ad from CzT tracker.
// @version 0.3
// @include http://tracker.cztorrent.net/*
// ==/UserScript==

var adSidebar = document.getElementById('reklama');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar = document.getElementById('ngame');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar = document.getElementById('notesy');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar = document.getElementById('hracky');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}