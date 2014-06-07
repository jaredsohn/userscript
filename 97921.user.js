// ==UserScript==
// @name    רב־לייזער
// @version    1.0
// @namespace    http://jidysz.net/
// @description    Zamiana ligatur jidysz na zwykły tekst.
// @include    *
// ==/UserScript==
// Released under the GPL license:
// http://www.gnu.org/copyleft/gpl.html

var replacements, regex, key, textnodes, node, s;

replacements = {
    "\uFB2E": "אַ",
    "\uFB2F": "אָ",
    "\uFB4C": "בֿ",
    "\uFB35": "וּ",
    "\u05F0": "וו",
    "\u05F1": "וי",
    "\u05F2": "יי",
    "\uFB1F": "ײַ",
    "\uFB1D": "יִ",
    "\uFB3B": "כּ",
    "\uFB44": "פּ",
    "\uFB4E": "פֿ",
    "\uFB2B": "שׂ",
    "\uFB4A": "תּ"};
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
