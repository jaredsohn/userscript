// JoelOnSoftware
// version 2.0
// 2005-11-04
// Copyright (c) 2005, Baruch Even
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.2.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "JoelOnSoftware Forum", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JoelOnSoftware
// @description   Move the sidebar to the right and leave only links in it
// @include       http://www.joelonsoftware.com/*
// @include       http://joelonsoftware.com/*
// ==/UserScript==

function insertBefore(elem, newelem)
{
	elem.parentNode.insertBefore(newelem, elem);
}
function removeElement(elem)
{
	elem.parentNode.removeChild(elem);
}


function beginTheURLFix()
{
	var sidebar = document.getElementById('sidebar');
	var spacertd = sidebar.nextSibling;
	
	while (spacertd.tagName != 'TD') {
		spacertd = spacertd.nextSibling;
	}
	
	var table = spacertd.parentNode;
	
	// Add spacer after the content entry
	removeElement(spacertd);
	table.appendChild(spacertd);

	// Add sidebar after spacer, we reverted the table order by this.
	removeElement(sidebar);
	table.appendChild(sidebar);

	// Move all links into the sidebar on their own, outside the main div
	var div = sidebar.firstChild;
	while (div.tagName != 'DIV') {
		div = div.nextSibling;
	}
	
	var allElements, thisElement;
	allElements = document.evaluate('//TD[@id="sidebar"]//A', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem(i);
		removeElement(thisElement);
		insertBefore(div, thisElement);
		insertBefore(div, document.createElement('BR'));
	}

	// Delete the div, it removes all the verbiage and leaves only the links
	removeElement(div);
}

beginTheURLFix();
