// Facebook: de-Suggestionify
// Version 0.1
// October 29th, 2009
// Copyright (C) 2009, Horatiu Halmaghi
// Licensed uner the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Facebook: de-Suggestionify", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Facebook: de-Suggestionify
// @namespace     http://halmaghi.com/
// @description   script to remove annoying suggestions in the latest facebook
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==

var parent = document.getElementById('home_sidebar');
var child = document.getElementById('pagelet_pymkbox');
parent.removeChild(child);
