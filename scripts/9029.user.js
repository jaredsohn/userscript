/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// Multiply Menus
// version 0.2
// 2008-01-22
// Copyright (c) 2006, Prakash Kailasa <pk-moz at kailasa dot net>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Click on the Install button on top right corner of the page.
// Accept the default configuration and install.
//
// To uninstall, right-click on the monkey icon in the status bar,
// and select 'Manage User Scripts' (Or, go to Tools -> Manage User Scripts),
// select "Multiply Show Unread Messages link", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	  Multiply Plus
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Miscellaneous enhancements to Multiply experience
// @version	  0.1
// @include	  http://multiply.com/*
// @include	  http://*.multiply.com/*
// @include	  http://multiply.qa.pezarisdesign.com/*
// @include	  http://*.multiply.qa.pezarisdesign.com/*
// @include	  http://multiply.chopin.dev.pezarisdesign.com:12345/*
// @include	  http://*.multiply.chopin.dev.pezarisdesign.com:12345/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

// style

// fix replies that are too wide and stretch the replyboxes.
GM_addStyle('.reply table { table-layout: fixed; width: 100%; overflow: auto; } .replybody { overflow: auto !important; }');
