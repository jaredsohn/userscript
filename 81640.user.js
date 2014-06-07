// Gomez UI Enhancement user script
// version 0.1 BETA!
// 2010-07-16
// Copyright (c) 2010, Nicholas Leskiw
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Gomez UI Enhancement", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gomez UI Enhancement
// @namespace     http://google.com/
// @description   This increases the height of the transaction boxes
// @include       http://*gomeznetworks.com/charting/*
// ==/UserScript==

var testsLayer = document.getElementById('testsLayer');
testsLayer.style.height = '400px';
var list2 = document.getElementById('list2');
list2.style.height = '400px';
