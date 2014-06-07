// ==UserScript==
// @name           Bloglines fixer
// @namespace      http://lieschke.net/projects/greasemonkey/
// @description    Fixes Bloglines buggy stripping of whitespace from Atom feeds
// @include        http*://*bloglines.com/myblogs_display*
// ==/UserScript==

function fixSpacing(tagName) {
	var elements = document.getElementsByTagName(tagName);
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];

		var previousNode = element.previousSibling;
		if (previousNode != null && previousNode.nodeType == 3 && !/[\(\[]$/.test(previousNode.nodeValue)) {
			previousNode.nodeValue = previousNode.nodeValue + ' ';
		}
		var nextNode = element.nextSibling;
		if (nextNode != null && nextNode.nodeType == 3 && /^[\w\(\[]/.test(nextNode.nodeValue)) {
			nextNode.nodeValue = ' ' + nextNode.nodeValue;
		}
	}
}

(function() {
	var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		link.innerHTML = link.innerHTML.replace(/\s*$/, '');
	}
	var tagsToFix = ['a', 'abbr', 'b', 'cite', 'code', 'del', 'dfn', 'em', 'ins', 'i', 'kbd', 'q', 'strong'];
	for (var i = 0; i < tagsToFix.length; i++) {
		fixSpacing(tagsToFix[i]);
	}
})();