
// Shelter from a Blizzard
// version 0.5
// 2007-02-07
// Copyright (c) 2007, NeonGoat
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
// @name          Shelter from a Blizzard
// @namespace     http://userscripts.org/
// @description   Removes the warning page when clicking on an external link in Blizzard Entertainment's World of Warcraft forums
// @include       http://forums.worldofwarcraft.com/*
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
	thisLink = allLinks.snapshotItem(i);
  
	newLink=document.createElement('a');
	newLink.setAttribute('href',thisLink.innerHTML);
	newLinkText=document.createTextNode(thisLink.innerHTML);
	newLink.appendChild(newLinkText);
 
	thisLink.parentNode.insertBefore(newLink, thisLink);
	thisLink.parentNode.removeChild(thisLink);
}
