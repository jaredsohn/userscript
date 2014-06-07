// ==UserScript==
// @name           OWL
// @namespace      http://omega359.info/owl
// @description    OWL cleanup
// @include        https://owl.cengage.com/owl-c/quiz_engine/*
// ==/UserScript==

var nodes = document.evaluate("//td/i[text() = 'Optional']/ancestor::tr[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < nodes.snapshotLength; i++) {
	node = nodes.snapshotItem(i);
	node.parentNode.removeChild(node);
}
