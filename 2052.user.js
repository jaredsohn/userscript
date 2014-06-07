// ==UserScript==
// @name           Telecom link fixer
// @namespace      http://lieschke.net/projects/greasemonkey
// @description    Fixes links on the Telecom web site so can be successfully opened in a new window.
// @include        http*://*telecom.co.nz*
// ==/UserScript==

(function() {
	window.addEventListener('load', function() {
			var noPopupPrefix = "javascript:noPopup('";
			var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < links.snapshotLength; i++) {
				with (links.snapshotItem(i)) {
					if (href.indexOf(noPopupPrefix) == 0) {
						href = href.slice(noPopupPrefix.length, -2);
					}
				}
			}
		}, true);
})();