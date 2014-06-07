// Google IG All Links New Window
// version 1.0
// 2005-09-21
// Copyright (c) 2005, Randall Wald
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
// @name Google IG All Links New Window
// @description Makes all the links on Google IG open in a new window
// @include http://*.google.com/ig
// ==/UserScript==

var allLinks, thisLink, fakeLinks1, fakeLinks2;
allLinks = document.evaluate(
	'//a',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.target = '_blank';
	}

fakeLinks1 = document.evaluate(
	'//a[@href="#"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
fakeLinks2 = document.evaluate(
	'//a[@href="javascript:void(0)"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < fakeLinks1.snapshotLength; i++) {
	thisLink = fakeLinks1.snapshotItem(i);
	thisLink.target = '';
	}

for (var i = 0; i < fakeLinks2.snapshotLength; i++) {
	thisLink = fakeLinks2.snapshotItem(i);
	thisLink.target = '';
	}