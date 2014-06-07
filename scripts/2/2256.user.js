// ==UserScript==
// @name        Simple eBay Item Links
// @namespace   http://finkel.org/avi/
// @description Create cleaner links to eBay items.
// @include     http://cgi.ebay.com/*
// ==/UserScript==

(function()
{
	var tds = document.evaluate(
		'//td[@align=\'right\'][@nowrap]', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);

	for (var i = 0; i < tds.snapshotLength; i++) {
		var td = tds.snapshotItem(i);
		if (
			 td.childNodes &&
			(td.childNodes.length > 0) &&
			(td.childNodes.item(0).nodeType == 3)
		) {
			var top = td.childNodes.item(0);
			var initData = top.data;
			var nlLoc = initData.indexOf(":", 0);
			top.data = initData.substring(0, nlLoc + 2);
			var num = initData.substr(nlLoc + 3, initData.length - 1);
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "/ws/eBayISAPI.dll?ViewItem&item=" + num);
			var linkText = document.createTextNode(num);
			newLink.appendChild(linkText);
			td.appendChild(newLink);
			return;
		}
	}
})();
