// ==UserScript==
// @name			eBay counter copy
// @src				http://52g.de/
// @description		(V 1.1) this script copys the andale image counter from the bottom of the page to the top so that you can see it without scrolling down the whole page
// @include			http://*.ebay.*/*ViewItem*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de)

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var counter = xpath("//font[contains(@id,'counter')]").snapshotItem(0).innerHTML;
//GM_log(counter);

var mytitel = xpath("//h1[@class='itemTitle']").snapshotItem(0);
if(mytitel)
	mytitel.innerHTML = "<font class='BasicStyle'>" + counter + "</font>&nbsp;&nbsp;&nbsp;" + mytitel.innerHTML;
