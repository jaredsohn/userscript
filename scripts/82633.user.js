// Feedly Maximize
// version 0.1 BETA!
// 30 June 2010
// Copyright (c) 2009, Ashit Vora
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
// select "ReTweet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FeedlyMaximize
// @namespace     http://voratec.com/projects/
// @description   Maximize the window size on Feedly.
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// ==/UserScript==

var container = document.getElementById("feedlyFrame");
alert(container.style.width);
container.style.width = "100%";

