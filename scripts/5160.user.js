// SecureBloglines 
// version 0.1 
// 2006-08-15
// Copyright (c) 2006, Kevin McMahon
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
// select "SecureBloglines", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SecureBloglines 
// @namespace     http://userscripts.org/people/4460
// @description   force Bloglines to use secure connection
// @include       http://*bloglines.com/*
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');
