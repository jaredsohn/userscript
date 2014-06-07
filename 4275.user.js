// WaMu Online Banking Secure Login
// Date: 2006-06-28
// Copyright (c) 2006, Josue Rodriguez
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
// select "WaMu Online Banking Secure Login", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WaMu Online Banking Secure Login
// @namespace     http://www.josuemedia.com/greasemonkey/
// @description   Force Washington Mutual Online Banking (homepage) to use secure 'https://' protocol connection
// @include       http://www.wamu.com/*
// @include       http://wamu.com/*
// @exclude       https://www.wamu.com/*
// @exclude       https://wamu.com/*
// @exclude       https://online.wamu.com/*
// ==/UserScript==

location.href = "https://online.wamu.com";