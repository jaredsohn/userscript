// ==UserScript==
// @name Use monospace font for GMail basic HTML view.
// @namespace http://draconx.ca
// @description Sets the font of the GMail message body to monospace in basic HTML mode.
// @include http*://*mail.google.com/*
// ==/UserScript==

(function () {
	var msgs = document.evaluate("//div[@class='msg']", document, null,
	                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                             null);
	for (var i = 0; i < msgs.snapshotLength; i++) {
		var msg = msgs.snapshotItem(i);
		msg.style.fontFamily = 'monospace';
		msg.style.fontSize   = '1.2em';
	}
})();
