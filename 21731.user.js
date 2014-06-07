// ==UserScript==
// @name           Fanboi
// @namespace      http://nerv.tv
// @description    Kill's the term fanbo(y/i/is) framework is cribbed from dumbquotes.user.js <http://diveintogreasemonkey.org/download/dumbquotes.user.js>
// @include        http://www.hardforum.com/*
// ==/UserScript==

var replacements, regex, key, textnodes, node, a;
replacements = {
   "fanboy": "enthusiast",
   "fanboi": "enthusiast",
   "fanb..": "enthusiast",
   "fanb..s": "enthusiasts",
   "fanboys": "enthusiasts",
   "fanbois": "enthusiasts",};

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
