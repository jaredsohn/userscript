// IDWS Auto-Link
// version 0.1 BETA!
// 2009-10-15
// Copyright (c) 2009, bimatampan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script. To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IDWS Auto-Link", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name IDWS Auto-Link
// @namespace http://freecomicsmanga.blogspot.com/
// @description automatically get a download link from Indowebster
// @include http://indowebster.com/*
// @include http://*.indowebster.com/*
// ==/UserScript==

if (document.body.textContent.match(/(https?\:\/\/[^/]+?\/[a-zA-Z0-9]{32}\.(?:avi|mp3|flv|mpg|rar))/)) {
alert('Ketemu ! ' + RegExp.$1 );
window.location.href = RegExp.$1 ;
}