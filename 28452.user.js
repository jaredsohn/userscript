// SitepointPrintView
// Version 1.0
// 2008-06-14
// Copyright (c) 2008, Paul Venuti
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
// select "SitepointPrintView", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SitepointPrintView
// @namespace     http://www.landlordcheck.org/namespace
// @description   Loads all Sitepoint.com stories in print friendly mode
// @include       http://sitepoint.com/*
// @include       http://*.sitepoint.com/*
// ==/UserScript==

var all, element;
all = document.getElementsByTagName('a');
for (var i=0; i <all.length; i++)
{
  element = all[i];
  element.href = element.href.replace(/\/article/,"/print");
}