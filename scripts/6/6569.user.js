// ==UserScript==
// @name           CareerBuilder Spam Remover
// @namespace      http://www.digivill.net/~joykillr
// @description    Removes the "Nationwide" search results which are apparently 100% spam.
// @include        http://*.careerbuilder.com/*
// @include        http://careerbuilder.com/*
// ==/UserScript==
//v. 2

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	var nodes = xpath(document, "//tr[contains(@class,'row')]/td[contains(@id,'tcLocation')]");
	for (var x=0; x<nodes.snapshotLength; x++) {
		if (nodes.snapshotItem(x).innerHTML.search(/US-Nationwide/i) != -1) {
		nodes.snapshotItem(x).parentNode.setAttribute("style", "display:none!important;");
		}
	}
