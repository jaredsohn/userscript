// craigslist Next Item Link
// version 1
// 2008-05-27
// Copyright 2007 Jason Diamond
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need to be
// using Firefox with the Greasemonkey extension.
//
// Visit http://greasemonkey.mozdev.org/ to install Greasemonkey.
// Then restart Firefox and revisit this script.  Under Tools, there
// will be a new menu item to "Install User Script".  Accept the
// default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select "eBay Next
// Item Link", and click Uninstall.
//
// This script adds a "Next item" link to item pages you view after
// doing a search on craigslist. Advancing directly to the next item is
// much more convenient than navigating back to the search results page
// and then clicking on the link to the next item in the list.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          craigslist Next Item Link
// @namespace     http://jason.diamond.name/userscripts
// @description   adds a link to the next item when browsing search results
// @include       http://*.craigslist.org/*
// ==/UserScript==

function main() {
	if (isSearchPage()) {
		saveLinks();
	} else {
		insertNextLink();
	}
}

function isSearchPage() {
	var searchForResult = document.evaluate(
		"//td[contains(., 'search for:')]",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null);
	return searchForResult.singleNodeValue;
}

function saveLinks() {
	var linksResult = document.evaluate(
		"//p/a",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var allLinks = "";
	for (var i = 0; i < linksResult.snapshotLength; ++i) {
		var link = linksResult.snapshotItem(i);
		if (allLinks != "") {
			allLinks += "\t";
		}
		allLinks += link.href;
	}
	var nextPageLink = getNextPageLink();
	if (nextPageLink) {
		allLinks += "\t" + nextPageLink;
	}
	GM_setValue("links", allLinks);
}

function getNextPageLink() {
	var nextResult = document.evaluate("//a[contains(., 'Next>>')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if (nextResult.singleNodeValue) {
		return nextResult.singleNodeValue.href;
	}
}

function insertNextLink() {
	var links = GM_getValue("links");
	if (links) {
		links = links.split("\t");
		var thisLink = window.location.toString();
		for (var i = 0; i < links.length; ++i) {
			if (links[i] == thisLink) {
				if ((i + 1) < links.length) {
					var nextLink = links[i + 1];
					var linkElement = document.createElement("a");
					linkElement.href = nextLink;
					linkElement.appendChild(document.createTextNode("next"));
					var rulesResult = document.evaluate("//hr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if (rulesResult.snapshotLength > 0) {
						var firstRule = rulesResult.snapshotItem(0);
						firstRule.parentNode.insertBefore(linkElement, firstRule);
					}
					if (rulesResult.snapshotLength > 1) {
						var nextRule = rulesResult.snapshotItem(1);
						nextRule.parentNode.insertBefore(linkElement.cloneNode(true), nextRule.nextSibling);
					}
				}
			}
		}
	}
}

main();

// CHANGELOG:
//
// v1 (2008-05-27)
// - initial release

