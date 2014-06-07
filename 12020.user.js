// ==UserScript==
// @author Flake
// @name Darkpirates.ba Trgovac
// based on "DumbQuotes" http://diveintomark.org/projects/greasemonkey/
// @description Dodaje prosječnu cijenu kamenja u 'Trgovini'
// @include       http://s*.darkpirates.ba/*
// @include       http://s*.ba.darkpirates.org/*
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Ova skripta je posvećena Darkpirates.ba TIM-u, tko će znati zašto
//

var replacements, regex, key, textnodes, node, s;

replacements = {
      "Quadrinij": "Quadrinij (oko 9.5)",
       "Željezo": "Željezo (oko 4.5)",
       "Helenij": "Helenij (oko 247)",
       "Polenij": "Polenij (oko 29.7)",
       "Phosarit": "Phosarit (oko 87)",
       "Melanit": "Melanit (oko 132)",
       "Duranij": "Duranij (oko 20)",
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