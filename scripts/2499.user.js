// ==UserScript==
// @name		accesskeys
// @namespace	        http://ra6ul.home.comcast.net/
// @description		accesskeys for prev/next/up + digit links
// @include		*
// ==/UserScript==

/* last updated: 5 mar 06 - filter update
 * xpath info. from diveintogreasemonkey.com
 */

(function () {
    // replace "p" "n" and "u" with whatever keys you prefer.
    var pkey = "p", nkey = "n", ukey = "u";
    
    function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    var links = xpath('//link[@rel]');
    for (var i = 0; i < links.snapshotLength; i++)
	if (/^prev(?:ious)?$/i.test(links.snapshotItem(i).rel))
	    var jkey = links.snapshotItem(i).href;
	else if (/^next$/i.test(links.snapshotItem(i).rel))
	    var lkey = links.snapshotItem(i).href;
	else if (/^(?:up|home)$/i.test(links.snapshotItem(i).rel))
	    var ikey = links.snapshotItem(i).href;

    var inputs = xpath('//input[@value]');
    for (var i = 0; i < inputs.snapshotLength; i++)
	if (/previous/i.test(inputs.snapshotItem(i).value))
	    inputs.snapshotItem(i).setAttribute("accessKey", pkey);
	else if (/next/i.test(inputs.snapshotItem(i).value))
	    inputs.snapshotItem(i).setAttribute("accessKey", nkey);

    var as = xpath('//a[@href]'), c = 1;
    for (var i = 0; i < as.snapshotLength; i++)
	if ((/(?:^back$)|((?:^|\W)(?:pr.c.dente?|prev(?:ious)?|\xab[^\xbb]*?)(?:\W|$))/i.test(as.snapshotItem(i).innerHTML)) || (/previous/i.test(as.snapshotItem(i).rel)) || (as.snapshotItem(i).href == jkey)) {
	    as.snapshotItem(i).setAttribute("accessKey", pkey);
	    c = 0;
	}	    
	else if ((/(?:^|\W)(?:suivante?|next|more\s(?:\&gt|results\")|[^\xab]*?\xbb)(?:\W|$)/i.test(as.snapshotItem(i).innerHTML)) || (/next/i.test(as.snapshotItem(i).rel)) || (as.snapshotItem(i).href == lkey)) {
	    as.snapshotItem(i).setAttribute("accessKey", nkey);
	    c = 0;
	}
	else if ((/^(?:[\w&]+?\W)(?:contents|toc|home|up).?.?$/i.test(as.snapshotItem(i).innerHTML)) || (/(?:up|home)/i.test(as.snapshotItem(i).rel)) || (as.snapshotItem(i).href == ikey))
	    as.snapshotItem(i).setAttribute("accessKey", ukey);

    if (c) {
	var x, y, z = [];
	for (var i = 0, j = 0, k = 0; i < as.snapshotLength; i++)
	    if (x = as.snapshotItem(i).innerHTML.match(/^\d\d?\d?$/)) {
		z[j] = as.snapshotItem(i).attributes.length;
		if (as.snapshotItem(i).innerHTML == (++k+1)) {
		    as.snapshotItem(i).setAttribute("accessKey", nkey);
		    if (/^\d\d?\d?$/.test(as.snapshotItem(i-1).innerHTML))
			as.snapshotItem(i-1).setAttribute("accessKey", pkey);
		    break;
		}	    
		else if (z[j] < z[j-1]) {
		    as.snapshotItem(i).setAttribute("accessKey", nkey);
		    if (/^\d\d?\d?$/.test(as.snapshotItem(i-2).innerHTML))
			as.snapshotItem(i-2).setAttribute("accessKey", pkey);
		    break;
		}
		else if ((y = as.snapshotItem(i-1).innerHTML.match(/^\d\d?\d?$/)) && (! /^\d\d?\d?$/.test(as.snapshotItem(i+1).innerHTML)) && (x == ++y)) {
		    if (z[j] > z[j-1])
			as.snapshotItem(i-1).setAttribute("accessKey", pkey);
		    else
			as.snapshotItem(i).setAttribute("accessKey", pkey);
		    break;
		}
		else
		    j++;
	    }
    }
})();
