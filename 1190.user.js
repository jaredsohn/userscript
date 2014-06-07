// Stevepavlina.com - eliminate new browser windows
// version 0.1 BETA
// 2005-07-11
// Copyright (c) 2005 Josh Staiger, josh@joshstaiger.org
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
// select "Stevepavlina.com - eliminate new browser windows", and click Uninstall.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Makes it so inner links on stevepavlina.com don't open a new browser window.  
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Stevepavlina.com - eliminate new browser windows
// @namespace     http://joshstaiger.org/projects/stevepavlinatargets
// @description	  Don't open new browser windows for links within stevepavlina.com.
// @include       http://stevepavlina.com/*
// @include       http://*.stevepavlina.com/*
// ==/UserScript==


// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list

function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function remapInternalLinkTargets(domain) {
    var allLinks = xpathAll('//a[contains(@href, "'+domain+'") and  @target="_blank"]');

    for(var i = 0; i < allLinks.snapshotLength; i++) {
	var thisLink = allLinks.snapshotItem(i);

	if(thisLink.getAttribute('target') == '_blank') {
	    thisLink.removeAttribute('target');
	}
    }
}

remapInternalLinkTargets('stevepavlina.com');
