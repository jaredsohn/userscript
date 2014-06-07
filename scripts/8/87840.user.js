// FBps
// version 0.1 BETA!
// 2010-02-14
// Copyright (c) 2010, Wael Orabi
// Based on the awesome work of Mark Pilgrim (GMailSecure)
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
// select "GMailSecure", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FBps
// @namespace     http://w43L.com/sandbox/fbps/
// @description   force Facebook to use secure connection
// @include       http://*facebook.com/*
// ==/UserScript==
window.location.href = window.location.href.replace(/^http:/, 'https:');
