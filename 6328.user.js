// NRG No Refresh
// version 0.5 BETA!
// 2006-11-12
// Copyleft (c) 2006, The Laughing Lizard 
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
// select "NRG No Refresh", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NRG No Refresh
// @description   Stops NRG pages from auto refreshing
// @include       http://*.nrg.co.il/*
// ==/UserScript==

setTimeout("refreshFlag = false", 1000 * 60 * 10);

