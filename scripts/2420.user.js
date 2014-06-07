// ==UserScript==
// @name          Digg in current window
// @namespace     http://minwoo.blogsite.org
// @description	  Open digg in current window
// @include       http://digg.com/*
// ==/UserScript==

function gm_xpath(what, where) {
    return document.evaluate(what,where,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
}

    allH3 = gm_xpath("//h3", document);

    for (i = 0; i < allH3.snapshotLength; i++) {
	if (allH3.snapshotItem(i).firstChild.nodeType == 3) {
            aElt = allH3.snapshotItem(i).firstChild.nextSibling;
        } else {
            aElt = allH3.snapshotItem(i).firstChild;
        }
        aElt.removeAttribute("target");
    }

