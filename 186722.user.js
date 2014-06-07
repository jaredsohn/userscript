// Hello World! example user script
// version 0.1 BETA!
// 2013-12-25
// Copyright (c) 2005, Felix Lin
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hello World
// @namespace     http://www.onallies.com/
// @description   example script to alert "Hello world!" on every page
// @include       http://www.qijutang.com/*
// @exclude       http://test.qijutang.com/*
// @exclude       http://m.qijutang.com/*
// @grant       none
// ==/UserScript==

alert('Hello world!');