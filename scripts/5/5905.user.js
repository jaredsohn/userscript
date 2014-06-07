// ==UserScript==
// @name Rename Accesskeys according to list
// @namespace http://hannes-schulz.de
// @description Rename all access keys to a set not used by programs/window manager (configure in source code!)
// @include *
// ==/UserScript==
(function () {
	function xpath(query) {
		return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	var links = xpath('//a[@accesskey]');
	var possibleTags = 'eugvcx<>';
	var currentTagIndex = 0;
	for (var i = 0; i < links.snapshotLength; i++) {
		var item = links.snapshotItem(i);
		var key = item.getAttribute("accesskey");
		item.removeAttribute("accesskey");
		item.setAttribute("accesskey",possibleTags.charAt(currentTagIndex).toString());
		currentTagIndex = currentTagIndex + 1;
		if(currentTagIndex>=possibleTags.length)
		  break;
	}
})();

