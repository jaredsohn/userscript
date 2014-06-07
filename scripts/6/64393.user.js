// negaterate
// version 0.1 beta!
// 2009-12-14
// copyright (c) 2009, blckshp
// released under the gpl license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// this is a greasemonkey user script.  to install it, you need
// greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// then restart firefox and revisit this script.
// under tools, there will be a new menu item to "install user script".
// accept the default configuration and install.
//
// to uninstall, go to tools/manage user scripts,
// select "negaterate", and click uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          negaterate
// @namespace     blckshp.org
// @description   script to remove the feckless and impotent "whose line" ratings from craigslist.org.
// @include       https://*.craigslist.org/*
// ==/UserScript==

var getElems = xpath('//table[@class="fbod threads"]//em');
removeElem(getElems);	//remove negs

getElems = xpath('//table[@class="fbod threads"]//font[@color="#009900"]');
removeElem(getElems);	//remove pos

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeElem(query) {
	var thisElem;
    for (var i = 0; i < query.snapshotLength; i++) {
	    thisElem = query.snapshotItem(i);
		thisElem.parentNode.removeChild(thisElem);
	}
}