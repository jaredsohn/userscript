// Vanguard Direct to Personal site user script
// 2005-12-29
// Copyright (c) 2005, Kai Mai(www.kai-mai.com)
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
// VGApp/hnw/CorporatePortal
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Vanguard Direct to Personal site
// @namespace     http://kai-mai.com/
// @description   go directly to vanguard personal site
// @include       http://vanguard.com/
// @include       http://www.vanguard.com/
// @include	  http://vanguard.com/VGApp/hnw/CorporatePortal
// ==/UserScript==

window.location.href = window.location.href.replace(/.*/,'https://flagship.vanguard.com/VGApp/hnw/home');

