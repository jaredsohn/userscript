// DZitcher
// version 0.2.2 beta
// 2008-06-17
// Copyright (c) 2008, Dan Dorman
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
// select "DZitcher", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name DZitcher
// @namespace http://underwhelm.net/greasemonkey/
// @description Skips past DZone's RSS page straight to the article
// @include http://www.dzone.com/links/*
// ==/UserScript==

var xpath = document.evaluate(
	"//div[@class='ldTitle']/a",
	document,
	null,
	XPathResult.ANY_UNORDERED_NODE_TYPE,
	null);
var link = xpath.singleNodeValue;
var href = link.getAttribute('href');

if (href) {
	window.location.href = href;
}