// The Pirate Bay - Show user torrents
//
// version 1.0
// 2006-11-26
// Copyright (c) 2006, Sarf
// Released under the GPL license
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
// select "TPB - Show user torrents", and click Uninstall.
//
//
// ==UserScript==
// @name           TPB - Show user torrents
// @namespace      http://sarf.mine.nu/
// @description    TPB - Show user torrents, changes PM link to show torrents by user instead
// @include        http://thepiratebay.org/tor/*
// ==/UserScript==
//
// --------------------------//

var strLabel;
var allLinks, thisLink, thisImg;
var i;
var newElement;
var userElement;
var myLink;

LabelUser = "&lt;torrents&gt;";

function phpbb_xpath(query) {
	return document.evaluate(
	query,
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
}

// Get insertion location
allLinks = phpbb_xpath("//a[contains(@href, '/pm.php')]");
// Insert link(s)
for (i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	userName = thisLink.innerHTML;
	
	newElement = document.createElement("a");
	newElement.href = "/user/" + userName;
	newElement.innerHTML = " " + LabelUser;
	thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);

	}

