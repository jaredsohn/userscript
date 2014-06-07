// Hide Google Sports Scores on the Google News Homepage
// version 0.1 BETA!
// 2008-06-16
// Copyright (c) 2008, Ben Morrow
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
// select "Hide Google Sports Scores", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hide Google Sports Scores
// @description   Hide the sports scores that take up valuable screen real estate on the Google News homepage. Example: On my homepage cricket scores are shown because I've added a custom section for "India".
// @include       http://news.google.com/*
// ==/UserScript==

document.getElementById("sports_scores").style.display = "none";