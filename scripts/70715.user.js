// This is a Greasemonkey script.
// See http://www.greasespot.net/ for more information on Greasemonkey.
//
// ==UserScript==
// @name           Otto.de tab enabler
// @namespace      http://dogpud.com/userscripts
// @description    Allows you to browse otto.de, opening product links in new tabs.
//                 The downside is that the product pages you open lose the filter settings you had on the search page.
// @include        http://www.otto.de/*
// @include        http://otto.de/*
// ==/UserScript==
//
// Version history:
// 1.0  2010-03-06  As simple as can be.

function otto_sanitise() {

	var allLinks, thisLink;
	
	allLinks = document.evaluate(
	    "//a[ starts-with(@onmouseover, \"this.href='javascript:goArticle(\") ]",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	    thisLink = allLinks.snapshotItem(i);
	    thisLink.removeAttribute('onmouseover');
	}
}

window.addEventListener("load", otto_sanitise, false);
