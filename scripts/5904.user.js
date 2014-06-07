// script to replace wikipedia search with google search
// version 1.0

// 24.09.2006
// Copyright (c) 2006, Stefan Oderbolz
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
// select "Browse ImmoScout", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Search 4 Wikipedia
// @namespace     http://www.readmore.ch
// @description   replace wikipedia search with google search 
// @include       http://*.wikipedia.*
// ==/UserScript==

var searchButton = document.getElementsByName('fulltext');
searchButton = searchButton[0];
searchButton.value = "Google";
searchButton.type = "button";
var onclick = document.createAttribute('onClick');
onclick.nodeValue = "window.location.href = 'http://www.google.com/search?q=' + escape(document.getElementById('searchInput').value);";
searchButton.setAttributeNode(onclick);

