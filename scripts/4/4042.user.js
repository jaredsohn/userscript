// ==UserScript==
// @name Remove numeric accesskeys
// @namespace http://micampe.it
// @description Remove stupid Alt-<number> access keys: they conflict with Firefox default tab switching shortcut
// @include *
// ==/UserScript==
(function () {
	function xpath(query) {
		return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	var links = xpath('//a[@accesskey]');
//	GM_log('Found ' + links.snapshotLength + ' stupid links');
	for (var i = 0; i < links.snapshotLength; i++) {
		var item = links.snapshotItem(i);
		var key = item.getAttribute("accesskey");
//		GM_log('Checking link ' + item.getAttribute("href"));
		if (parseInt(key) >= 0 && parseInt(key) <= 9) {
//			GM_log('Removing accesskey from link');
			item.removeAttribute("accesskey");
		} else {
//			GM_log('Link has a sane accesskey');
		}
	}
})();
