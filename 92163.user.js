// Ain't It Readable
// version 0.6 BETA!
// 2005-05-02
// Copyright (c) 2010, Tarik Čelik
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
// select "Ain't It Readable", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook profile add remover
// @namespace     http://userscripts.org/users/heronimus
// @description   Removes the adds from the facebook profile page
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==
GM_addStyle("#pagelet_netego_ads{display: none}");

