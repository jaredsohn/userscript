// ==UserScript==
// @name Mancandy
// @description Replaces the word "neckbeard" with "scrumptrilescent mancandy".
// @include *
// ==/UserScript==

var replacements, regex, key, textnodes, node, s; replacements = {"neckbeards": "scrumptrilescent mancandy", "Neckbeards": "Scrumptrilescent mancandy", "NECKBEARDS": "SCRUMPTRILESCENT MANCANDY", "neckbeard": "scrumptrilescent mancandy", "NECKBEARD": "SCRUMPTRILESCENT MANCANDY", "Neckbeard": "Scrumptrilescent mancandy"};regex = {};for (key in replacements) {    regex[key] = new RegExp(key, 'g');}textnodes = document.evaluate(    "//text()",    document,    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,    null);for (var i = 0; i < textnodes.snapshotLength; i++) {node = textnodes.snapshotItem(i);	s = node.data;		for (key in replacements) {s = s.replace(regex[key], replacements[key]);	}	node.data = s;}var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ ){	var paragraph = paragraphs[i];	paragraph.innerHTML = paragraph.innerHTML;} //Thanks to Scott Reynen for the original skeleton