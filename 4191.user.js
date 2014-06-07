//  moviemeter redirect imdb
// version 0.1
// 2006-06-11
// Copyright (c) 2005, josdigital
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
// select "moviemeter redirect imdb", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         moviemeter redirect imdb
// @namespace     josdigital
// @description   redirects moviemeter pages to its corresponding imdb page
// @include       http://www.moviemeter.nl/film/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(10);
	window.location.href = thisLink;
}