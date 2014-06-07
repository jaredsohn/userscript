// ==UserScript==
// @name           2cat alternative domain
// @namespace      http://userscripts.org/users/132233
// @description    2cat.twbbs.org -> 2cat.or.tl
// @include        http://www.komica.org/bbsmenu.htm
// ==/UserScript==

var target	= '2cat.twbbs.org';
var replacement	= '2cat.or.tl';

// XPath
var anchorPath = '//a[contains(@href, "{0}")]';

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function replaceAddress() {
	var allAnchor = xpath(anchorPath.replace('{0}', target));
	var anchor;
	for (var i = 0; i < allAnchor.snapshotLength; i++) {
		anchor = allAnchor.snapshotItem(i);
		anchor.setAttribute('href', anchor.href.replace(target, replacement));
	}
}

replaceAddress();