// Digg Full Screen
// version 1.0
// 2008-12-09
// Copyright (c) 2008, IARP
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
// @name           Digg Full Screen
// @namespace      http://www.iarp.ca/node/2
// @description    Makes Digg fill the entire screen rather than a maximum width.
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// ==/UserScript==

document.getElementById('container').setAttribute("style", "max-width:100%;")