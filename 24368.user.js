// Hello World! example user script
// version 0.1 BETA!
// 2008-03-26
// Copyright (c) 2008, Ionut Danciu
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
// @name Hello World
// @description example script to alert "Hello world!" on every page
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*mail.yahoo.com/mc/compose*
// @include        http://*mail.yahoo.com/ym/Compose*
// ==/UserScript==


alert('Just some test text!');