// War of Legends Header Bar Removal Script
// version 0.1
// 04-29-2010
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wol Header Bar Removal
// @namespace
// @description   removes the header bar on the War of Legends Game Page
// @include        http://services.jagex.com/*/play.ws*
// ==/UserScript==

var headerBar = document.getElementById("header_bar");
headerBar.style.display = "none";