// Shelter from a Blizzard
// version 0.6
// 2008-03-27
// Copyright (c) 2007, NeonGoat, Trellmor <daniel@tac-ops.net>
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
// select "Shelter from a Blizzard", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Shelter from a Blizzard (reworked)
// @namespace     http://dani.tac-ops.net
// @description   Removes the warning page when clicking on an external link in Blizzard Entertainment's World of Warcraft forums
// @include       http://forums.worldofwarcraft.com/*
// @include       https://forums.worldofwarcraft.com/*
// @include       http://forums.wow-europe.com/*
// @include       https://forums.wow-europe.com/*
// ==/UserScript==

var allLinks, thisLink, newLink, newLinkText;
allLinks = document.evaluate(
	'//a[@onclick]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allLinks.snapshotLength; i++)
{
	thisLink = allLinks.snapshotItem(i);	if( thisLink.getAttribute( 'onclick' ) == 'return warn(this)' ) {
		thisLink.setAttribute( 'onclick', '' );
	}
}
