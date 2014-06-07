// eBay Next Item Link
// version 5
// 2008-09-04
// Copyright 2005-2008 Jason Diamond
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
// doing a search on eBay. Advancing directly to the next item is much
// more convenient than navigating back to the search results page and
// then clicking on the link to the next item in the list.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Next Item Link
// @namespace     http://jason.diamond.name/userscripts
// @description   adds a link to the next item when browsing search results
//
// @include       http://search.ebay.com/*
// @include       http://*.search.ebay.com/*
// @include       http://shop.ebay.com/*
// @include       http://*.shop.ebay.com/*
// @include       http://cgi.ebay.com/*
//
// @include       http://search.ebay.co.uk/*
// @include       http://*.search.ebay.co.uk/*
// @include       http://shop.ebay.co.uk/*
// @include       http://*.shop.ebay.co.uk/*
// @include       http://cgi.ebay.co.uk/*
// ==/UserScript==

function main() {
	if (isSearchPage()) {
		saveLinks();
	} else {
		addNextItemLink();
	}
}

function isSearchPage() {
	return location.hostname.indexOf('search.') !== -1 || location.hostname.indexOf('shop') !== -1;
}

function saveLinks() {
	var links = getLinks();
	if (links.length > 0) {
		var value = serializeLinks(links);
		GM_setValue('links', value);
	}
}

// The "ebcTtl" class is for the "old" eBay (with "search" in the domain).
// The "ttl" class is for the "new" eBay (with "shop" in the domain).
function getLinks() {
	var links = [];
	var linksResult = document.evaluate('(//td[@class="ebcTtl"]|//div[@class="ttl"])//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < linksResult.snapshotLength; i += 1) {
		var link = linksResult.snapshotItem(i);
		links.push(link.href);
	}
	return links;
}

function serializeLinks(links) {
	return links.join('\t');
}

function deserializeLinks(value) {
	return value.split('\t');
}

function addNextItemLink() {
	var value = GM_getValue('links');
	if (value) {
		var links = deserializeLinks(value);
		var nextItemLink = findNextItemLink(links);
		if (nextItemLink) {
			var backLink = findBackLink();
			if (backLink) {
				var insertBeforeThisNode = backLink.nextSibling;
				backLink.parentNode.insertBefore(document.createTextNode(' | '), insertBeforeThisNode);

				var textLink = document.createElement('a');
				textLink.href = nextItemLink;
				textLink.appendChild(document.createTextNode('Next item'));
				backLink.parentNode.insertBefore(textLink, insertBeforeThisNode);

				backLink.parentNode.insertBefore(document.createTextNode(' '), insertBeforeThisNode);

				var imageLink = document.createElement('a');
				imageLink.href = nextItemLink;
				var image = document.createElement('img');
				image.src = 'data:image/gif;base64,R0lGODlhFAAUALMAAAAAAMHA8wBj8LGx7wAAmZKT7b%2B%2FzvX1%2FjOT8N7d%2BKGi77%2B%2B8P%2F%2F%2F87Q9unq%2Bv%2F%2F%2FyH5BAUUAA8ALAAAAAAUABQAAASy8MnZhipFjTY71U1yHEmlcN4TBOLojsmweOtrj84yS9V9AC%2BHYyNRiBjIJADAcDkaikfvkFQimE1HQmHYjKpIAOIKq1hay%2FQSIbhqKxjHSDyuC%2B7Xxio%2BZ9%2F%2FfwQACwMZaASIiYEAARYFXj9qSwQCgg2ECicDcl9KiACXA4UGDyecLwCWhI48m0KvCUsrohc7DzoJuQ27g6KOAx4LCgt6s74XwCkBmRq0FwW2KSrPGMMpEQA7';
				image.border = 0;
				image.align = 'absmiddle';
				imageLink.appendChild(image);
				backLink.parentNode.insertBefore(imageLink, insertBeforeThisNode);
			}
		}
	}
}

function findNextItemLink(links) {
	var currentItemLink = window.location.toString();
	for (var i = 0; i < links.length; ++i) {
		if (links[i] === currentItemLink) {
			if ((i + 1) < links.length) {
				return links[i + 1];
			}
			return null;
		}
	}
	return null;
}

function findBackLink() {
	var backLinkResult = document.evaluate('//a[. = "Back to list of items"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return backLinkResult.singleNodeValue;
}

main();

// CHANGELOG:
//
// v1 (2005-07-03)
// - initial release
// v2 (2005-09-08)
// - update to reflect latest changes to eBay web site
// v3 (2005-10-19)
// - added image to next item link
// v4 (2006-01-31)
// - update to work with new eBay
// - use XPath instead of manual DOM traversal
// - works with ebay.com and ebay.co.uk now
// v5 (2008-09-04)
// - includes more URLs for search pages
// - works with new eBay "shop" domains
// - completely rewrote so that it's easier to read and update

