// expat.ru Auto-Refresh Stopper
// Version 0.2
// 2006/02/26
// Copyright (c) 2006, Guillaume Bilodeau
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
// select "expat.ru Auto-Refresh Stopper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          expat.ru Auto-Refresh Stopper
// @description   Removes iframes which trigger a periodic page refresh
// @include       http://expat.ru/forum/*
// @include       http://www.expat.ru/forum/*
// ==/UserScript==

// The refresh is triggered by the banner's iframes, some way or another.
// This script removes the banner completely, stopping the page from refreshing.

var table = document.getElementsByTagName('table')[0];
table.parentNode.removeChild(table);
