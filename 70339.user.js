// ==UserScript==
// @name           Nano-Reef Optimizer
// @namespace 
// @description    Replaces various words
// @include        *
// ==/UserScript==

var replacements, regex, textnodes,  key, node, s;

replacements = {

"Rockfish":"Clam Douchebag",
"rockfish":"clam douchebag",
"thrive":"have gay sex",
"Thrive":"Have gay sex",
"thriving":"so totally fucking fabulous",
"Thriving":"So totally fucking fabulous",

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