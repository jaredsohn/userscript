// KOC AUTO Refresher
// version 1.0
// 22/07/2011
// Copyright (c) 2011, R2D2 (The Driod!)
// Released
// http://
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          KOC AUTO Refresher
// @namespace     
// @description   This script will auto refresh KOC every 30 minutes to keep you logged into FB
// @include       http://apps.facebook.com/kingdomsofcamelot/*
// @exclude       
// ==/UserScript==

window.setTimeout(function() { document.location.reload(); } , 1800000);