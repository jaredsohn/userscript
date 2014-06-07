// Dot Mac
// version 0.1
// 2007-06-21
// Copyright (c) 2007, Christopher Horrell
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
// select "Dot Mac", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Dot Mac
// @namespace     http://horrell.ca/code/
// @description   This user script enhances the Dot Mac interface. Specifically, it removes the common Apple header navigation to provide more room when reading email etc.
// @include       http://www.mac.com/*
// @include       http://*.mac.com/*
// ==/UserScript==

// Remove Global Nav
var globalheader = document.getElementById('globalheader');
if (globalheader) {
    globalheader.parentNode.removeChild(globalheader);
}