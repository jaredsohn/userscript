// ==UserScript==
// @name           TTAC comment reversal
// @namespace      tag:kpschoedel@yahoo.ca,2007:ttac-comment-reversal
// @description    Reverse the order of comments on The Truth About Cars
// @author         Kevin Schoedel
// @version        0.1 (April 6, 2007)
// @include        http://*.thetruthaboutcars.com/*
// ==/UserScript==

clists = document.evaluate("//ul[@class='commentlist']",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);

for (i = 0; clist = clists.snapshotItem(i); i++) {
    // GM_log(i + ":" + clist.id + ":" + clist);
    comment = new Array();
    for (c = clist.firstChild; c; c = nextc) {
	nextc = c.nextSibling;
	clist.removeChild(c);
	if (c.nodeName == 'LI') {
	    comment.push(c);
	}
    }
    for (n = comment.length - 1; n >= 0; --n) {
	clist.appendChild(comment[n]);
    }
}




