// ==UserScript==
// @name          FacebookNames
// @description   Allows you to re-name complete twazzocks that can't remember their own, actual, name.
// @include       http://*facebook.com*
// ==/UserScript==
//
// By: Carl van Tonder
// Email: 
// Last Update:  06/04/2008

var replacements, regex, key, textnodes, node, s;

replacements = {
    "Baz ": "Barry ",
    "JIIIIIIM ": "Jim "};
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