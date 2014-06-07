// Ain't It Readable
// version 0.6 BETA!
// 2012-07-04
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
// @name          1chanel.ch overlay remover
// @namespace     http://userscripts.org/users/heronimus
// @description   Removes overlay from 1chanel.ch
// @include       http://1chanel.ch/*
// @include       http://*.1chanel.ch/
// ==/UserScript==
GM_addStyle("#mg_overlay{display: none}");
GM_addStyle("#mg_overlay_window{display: none}");