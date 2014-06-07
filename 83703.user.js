// Remove some elements from centarnekretnina.net
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CentarNekretnina Cleanup
// @description   Hides some elements on the page
// @include       http://www.centarnekretnina.net/*
// @include       http://*.centarnekretnina.net/*
// ==/UserScript==

var ribbon1div = document.getElementById('chanceribbon');
ribbon1div.style.display = 'none';

var ribbon2div = document.getElementById('barometarribbon');
ribbon2div.style.display = 'none';
