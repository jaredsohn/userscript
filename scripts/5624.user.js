// Copyright (c) 2006, Bryan Himes
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
// select "Facebook News Feed Remover", and click Uninstall.
//
//
// Not to worry, I am planning great things!
// Facebook needs it, after all.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook News Feed Remover
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   example script to alert "Hello world!" on every page
// @include       http://*.facebook.com/*
// ==/UserScript==

var newsFeed = document.getElementById("home_main");

if (newsFeed) {
    newsFeed.parentNode.removeChild(newsFeed);
};
