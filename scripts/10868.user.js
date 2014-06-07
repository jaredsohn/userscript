
// ==UserScript==
// @author Duvel
// @name DarkPiratesTrader
// based on "DumbQuotes" http://diveintomark.org/projects/greasemonkey/
// @description adds average BUY prices in DarkPirates trade screen
// @include       *darkpirates*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This script is dedicated to Cory Doctorow, who will know why.
//

var replacements, regex, key, textnodes, node, s;

replacements = {
      "Quadrinium": "Quadrinium (avg 8.5)",
       "Iron": "Iron (avg 4.4)",
       "Helenium": "Helenium (avg 244)",
       "Polenium": "Polenium (avg 29.8)",
       "Phosarit": "Phosarit (avg 90)",
       "Melanit": "Melanit (avg 135)",
       "Duran": "Melanit (avg 20)",
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

