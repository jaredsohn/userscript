// ==UserScript==
// @name           Google Search Shortcut
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Adds a keyboard shortcut of ctrl + '/' to jump back to the search input box when viewing your search results in Google
// @include        http://www.google.*
// ==/UserScript==
(function() {
	window.addEventListener('load', function() {
		var tmp = document.evaluate(
			'//input[@name="q"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		if (tmp.snapshotLength === 2) {
			var search = tmp.snapshotItem(0);
			document.addEventListener('keydown', function(e) {
				if (e.ctrlKey && e.keyCode == 191) { // ctrl + '/'
					e.preventDefault();
					e.stopPropagation();
					search.focus();
				}
			}, false);
		}
	}, true);
})();