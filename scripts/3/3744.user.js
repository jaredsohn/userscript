// Skips the go to isle button in ik
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Steven Hills
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
// select "IK skip", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IK skip
// @namespace     http://stevenh.ath.cx/projects/greasemonkey/
// @description   skips the go to isle button on ik
// @include       http://www.ik02.de/en/*
// ==/UserScript==
var href = window.location.href
var len = href.length
if (len==39) {window.location.href = window.location.href.replace('?s=', '?p=main&s=');}
else {};