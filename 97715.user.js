// Codename Cuttlefish - Paint it Black - Colourlovers
// version 0.1
// 2011-2-23
// Copyright (c) 2010, Ryan Ludwig
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Codename Cuttlefish - Paint it Black - Colourlovers
// @namespace     http://www.codenamecuttlefish.com/project-files/paint-it-black/
// @description   Turns the ultra white v4 into the sublter greys of v3.
// @include       http://www.colourlovers.com/*
// ==/UserScript==


head = document.getElementsByTagName('head')[0],
css = document.createElement('link'),
css.type = 'text/css';
css.rel = 'stylesheet';
css.href = "http://www.codenamecuttlefish.com/project-files/paint-it-black/paintitblack.css";
 
head.appendChild(css);