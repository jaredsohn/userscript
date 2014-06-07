// ==UserScript==
// @name          eBay Search Links V2
// @version       2.0.0.0
// @namespace     http://userscripts.org/
// @description   Makes auction search results use smaller links.
// @creator       Jesse Graffam
// @contributor   Marco Schubert
// @id            fc96c2d2-32bb-4493-ae8e-1545a4d33f08
// @include       http://*.ebay.tld/*
// @exclude       http://*.ebay.tld/*ViewItem*
// ==/UserScript==
//
// © 2009 Jesse Graffam
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// version 3 as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You can receive a copy of the GNU General Public License by
// visiting http://www.gnu.org/licenses/gpl-3.0.html

(function()
{
	// RegEx to determine the links to articles.
	const urlRegEx = /(http:\/\/cgi\.ebay(?:\.[a-zA-Z]+){1,2})\/.*(\d{12}).*/

	// Get all Links on an eBay page
	var allLinks = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	// some variables
	var hr;
	var imgs;
	var extLink;

	// Take a look into every link.
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		hr = allLinks.snapshotItem(i).href;
		if (urlRegEx.test(allLinks.snapshotItem(i).href)) {
			// It's a link to an article. Replace the difficult address with a more common one.
			hr = hr.replace(urlRegEx, "$1/ws/eBayISAPI.dll?ViewItem&Item=$2");
			allLinks.snapshotItem(i).href = hr;
			// Now extent links with a small icon that opens an article in a new window or tab.
			// Check, if there are images as child nodes. These links will not be extended.
			imgs = document.evaluate("img", allLinks.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (imgs.snapshotLength == 0) {
				// No images inside the <a> node.
				extLink = document.createElement("a");
				extLink.href = hr;
				extLink.target = "_blank";
				extLink.innerHTML = '<img width="10" height="10" src="data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAICAgMzMzP///yH5BAkAAAIALAAAAAAKAAoAAAg0AAUIAECwIEGBBg0iHMCwIYAAAQA0dAhR4sQBDzFexBgAY0KCHScGECggZMORAiGqhEgyIAA7" title="Open in new window" border="0" />';
				// Insert after the original one.
				allLinks.snapshotItem(i).parentNode.insertBefore(extLink, allLinks.snapshotItem(i).nextSibling);
				// Place a blank between the two links.
				allLinks.snapshotItem(i).parentNode.insertBefore(document.createTextNode(" "), allLinks.snapshotItem(i).nextSibling);
			}
			imgs = null;
		}
	}
})();