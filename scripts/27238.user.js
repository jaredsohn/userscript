// ==UserScript==
// @name           Slashdot Idle eliminator
// @namespace      http://lieschke.net/projects/greasemonkey/
// @description    Kills stories from the Idle section appearing on Slashdot.
// @include        http://slashdot.org/*
// ==/UserScript==

(function() {
	var anchors = document.evaluate('//a[@href="//idle.slashdot.org/"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < anchors.snapshotLength; i++) {
		var anchor = anchors.snapshotItem(i);
		if (anchor.nextSibling.nodeValue != ':') {
			return;
		}
		var div = anchor.parentNode.parentNode.parentNode.parentNode.parentNode;
		var parent = div.parentNode;
		var kill = function(el) {
			for (var next = el.nextSibling; next.nodeType != 1; next = next.nextSibling) ;
			parent.removeChild(el);
			return next;
		}
		kill(kill(kill(div)));
	}
})();