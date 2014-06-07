// 
// ==UserScript==
// @name          Quotation Fixer
// @namespace     
// @description   Fixes mangled punctuation marks from bad character encoding.
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------

var replacements, regex, key, textnodes, node, s;

replacements = {
	"\u00e2\u20ac\u0153": "\u201c",
	"\u00e2\u20ac(?![\u0153\u2122\u201c])": "\u201d",
	"\u00e2\u20ac\u2122": "\u2019",
	"\u00e2\u20ac\u201c": "\u2013",
}

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	node = textnodes.snapshotItem(i);
	s = node.data;
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}
	node.data = s;
}