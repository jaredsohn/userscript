// FirefoxVerticalScrollbars.user.js
// version 1.0
// 2008-05-06
// Copyright (c) 2008, Jeff Killingsworth
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
// select "FirefoxVerticalScrollbars", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FirefoxVerticalScrollbars
// @namespace     tag:FirefoxVerticalScrollbars
// @description   Makes the vertial scroll bar always show in firefox
// ==/UserScript==
GM_addStyle( "html {overflow: -moz-scrollbars-vertical;}" );