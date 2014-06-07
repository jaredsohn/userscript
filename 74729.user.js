// ==UserScript==
// @name           TinEye + NoScript
// @namespace      http://userscripts.org/users/108927
// @include        http://www.tineye.com/*
// ==/UserScript==

// sort order links

(function() {
	var items = document.evaluate('//div[@class="search-results-menu"]/ul/li/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < items.snapshotLength; i++) {
		var item = items.snapshotItem(i);
		
		var match = item.href.match(/change_sort\('(\w+)_(\w+)'\)/); if (match) {
			item.href = "?sort=" + match[1] + "&order=" + match[2];
		}
	}
})();

// search result: 'link'

(function() {
	var items = document.evaluate('//div[@class="result-match-image"]/p/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < items.snapshotLength; i++) {
		var item = items.snapshotItem(i);
		
		var match = item.href.match(/toggleDisclosureWidget\('(results-\w+)'\)/); if (match) {
			var results = document.evaluate('//div[@id="' + match[1] + '"]/descendant::a[starts-with(@href, "http://www.tineye.com/search/show_match/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (results.snapshotLength) {
				item.href = results.snapshotItem(0).href;
			}
		}
	}
})();
