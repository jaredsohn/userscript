// ExpertsExchange-Refresh Listing
// version 0.1
// 09 May 2008
// Copyright (c) 2008, Kumar S
// http://www.guyfromchennai.com
//
// Wrote this script inorder to see the new questions posted in my favourite sections
// can add other sections like javascript etc, too.
//
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
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           EE-Refresh Listing
// @namespace      EERefresher
// @description    Refreshes the Questions Listing page every 10 minutes
// @include        http://www.experts-exchange.com/Programming/Languages/Scripting/JavaScript/
// ==/UserScript==
var timerCount = 10;
window.setInterval("window.location.reload();",timerCount*60*1000);