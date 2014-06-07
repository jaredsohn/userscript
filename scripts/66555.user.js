// ==UserScript==
// @name           Perez Hilton is a douchebag
// @namespace 
// @description    Perez Hilton is a douchebag
// @include        *
// ==/UserScript==

var replacements, regex, textnodes,  key, node, s;

replacements = {
"Perez Hilton":"Professional douchebag Perez Hilton"
};

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