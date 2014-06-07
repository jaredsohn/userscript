// script to fake the geolocation
// version 1.0

// 29.12.2012
// Copyright (c) 2012, Stefan Oderbolz
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
// select "Fake Geolocation", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fake Geolocation
// @namespace     http://www.readmore.ch
// @description   Script to fake the current geolocation
// @include       *
// ==/UserScript==

navigator.geolocation.getCurrentPosition = function(callback) {
    callback({coords: {latitude: 47.1, longitude: 8.1}});
}