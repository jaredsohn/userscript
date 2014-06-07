// My PI Nursery user script
// version 1.0
// 200-05-13
// Copyright (c) 2007, Joseph Becher
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "My PI Nursery", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          My PI Nursery
// @namespace     http://jwebnet.net/
// @description   script to add user id to nursery link on PonyIsland.
// @include       http://ponyisland.net/*
// @include       http://www.ponyisland.net/*
// ==/UserScript==

var usr = document.getElementById('usr');
if (usr) {
	var allLinks, thisLink;
	allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if ( thisLink.parentNode.nodeName.toUpperCase() == 'SPAN' ) {
			if ( thisLink.parentNode.parentNode.nodeName.toUpperCase() == 'H3' ) {
				if ( thisLink.parentNode.parentNode.parentNode.id.toUpperCase() == 'USR' ) {
					usrLink = thisLink;
					i = allLinks.snapshotLength;
				}
			}
		}
	}
	allLinks = document.evaluate(
		"//a[@title='Nursery']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		nurseryLink = thisLink;
		i = allLinks.snapshotLength;
	}

	var cusr = document.getElementById('cusr');
	if (!cusr) {
		if (nurseryLink.href.match(/\?/i)) {
			nurseryLink.href += '&' + usrLink.href.split("&")[2];
		} else {
			nurseryLink.href += '?' + usrLink.href.split("&")[2];
		}
	}
}