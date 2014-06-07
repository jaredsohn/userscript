// Hello World! example user script
// version 0.1 BETA!
// 2009-10-12
// Copyright (c) 2009, Wilson Dmello
// Released under the GPL license
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hello World
// @namespace     
// @description   example script to alert "Hello world!" on every page
// @include       http://www.orkut.com/Main#Home*

// ==/UserScript==
setTimeout(function() { document.location.reload(); } , 60000);