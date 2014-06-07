// Index.hu 
// 2008-06-24
//
// ==UserScript==
// @name          Index.hu igénytelenség-mentesítő
// @namespace     http://lorentey.hu
// @description   Az igénytelen hullámos "ő"-ket és a kalapos "ű"-ket az igazi magyar betűkre cseréli az Index.hu-n.
// @include       http://index.hu/*
// @include       http://*.index.hu/*
// ==/UserScript==

var replacements, regex, key, textnodes, node, s;

replacements = {
    "õ" : "ő",
    "Õ" : "Ő",
    "û" : "ű",
    "Û" : "Ű",
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
