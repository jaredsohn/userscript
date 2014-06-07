// Remove NYT Share Tools
// Version 1.0 Beta
// 2010-01-25
// Copyright (c) 2010, Paul Venuti
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
// select "Remove NYT Share Tools", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Change History
//
// Version 1 Beta (2010-01-25)
// -- Initial version
//
//
// ==UserScript==
// @name          Remove NYT Share Tools
// @namespace     http://venutip.com/greasemonkey
// @description   Removes the "Share" button from the article tools on the New York Times, which I find distracting
// @include       www.nytimes.com/*
// @include       nytimes.com/*
// @include       *.nytimes.com/*
// ==/UserScript==

var shareTools = document.getElementById('shareMenu');
shareTools.parentNode.removeChild(shareTools);