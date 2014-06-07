// ==UserScript==
// @name		Quantcast Link Redirector
// @description	Quantcast Link Redirector
// @version 	1.0
// @date		14/10/2009
// @lastupdate	14/10/2009
// @namespace	arifulbd.wordpress.com
// @author 		Md. Ariful Islam
// @include	http://*.quantcast.com/*
// ==/UserScript==

	var elements = xpath("//body/div/div/div/div/table/tbody/tr/td/a");
	if (elements.snapshotLength > 0) {
		for (var i = 0; i < elements.snapshotLength; i++) {
			var element= elements.snapshotItem(i);
			element.href="http://www." + element.text;
			element.target="_blank";
		}
	}	
	
	function xpath (query) {
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}