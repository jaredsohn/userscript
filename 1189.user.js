// Kill Amazon Mouseover Popovers
// version 0.1 BETA
// 2005-07-17
// Copyright (c) 2005 Josh Staiger, josh@joshstaiger.org
// http://joshstaiger.org
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Kill Amazon Mouseover Popovers", and click Uninstall.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Eliminates some of the more annoying mousoever popovers on Amazon.com, 
// namely the "See all 31 product categories" popover and the Gold box 
// popover.  
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kill Amazon Mouseover Popovers
// @namespace     http://joshstaiger.org/projects/killamazonpopovers
// @description	  Eliminates some of the more annoying mouseover popovers on Amazon.com, namely the "See all 31 product categories" popover and the Gold box popover.  
// @include       http://*.amazon.*
// @include       http://amazon.*
// ==/UserScript==


// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list

function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function removeCategoriesPopover() {
    removeLinkNameAttribute('two-tabs|he|all-categories');
}

function removeGoldBoxPopover() {
    removeLinkNameAttribute('goldboxPop|he|goldboxPopDiv_1');
}

function removeLinkNameAttribute(linkNameAttribute) {

   var namedLinksSnapshot = xpathAll('//a[@name="'+ linkNameAttribute + '"]');

    for (var i = 0 ; i < namedLinksSnapshot.snapshotLength ; i++) {
	var namedLinkNode = namedLinksSnapshot.snapshotItem(i);

	namedLinkNode.removeAttribute('name');
    }

}

removeCategoriesPopover();
removeGoldBoxPopover();
