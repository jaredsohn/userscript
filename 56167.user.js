// ==UserScript==
// @author peterek
// @name QuakeLive przetlumaczone na Polski
// @description Przetlumaczenie QuakeLive z jezyka angielskiego na polski
// @include       http://quakelive.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
//

var replacements, regex, key, textnodes, node, s;

replacements = {
	"Game Settings": "Ustawienia",
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