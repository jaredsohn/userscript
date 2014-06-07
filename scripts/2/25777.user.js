// ==UserScript==
// @name          OMGPLUTOR
// @namespace     http://www.metafilter.com/
// @description   http://metatalk.metafilter.com/16189/#540118
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==
if (/.*metafilter\.com\/(\d{1,7}\/|mefi\/|comments\.mefi).*/.test(window.location)) {
	var elements = document.evaluate('//div/span[@class="smallcopy"]/parent::node()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=1,element;element = elements.snapshotItem(i);i++) {
		while (element.childNodes.length > 1) {
			element.removeChild(element.childNodes[0]);
		}
		element.insertBefore(document.createTextNode("OMGPLUTOR"),element.childNodes[0]);
		element.insertBefore(document.createElement("br"),element.childNodes[1]);
	}
	if (window.location.hash) {
		location.href = location.href; // move back to correct anchor - should only run once
	}
}