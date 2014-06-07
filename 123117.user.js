// ==UserScript==
// @name       Safety Protecter for Android
// @namespace  http://www.sshz.co.cc/
// @version    0.1
// @description  Automatically Change Scores of stud.chinahw.net
// @include    http://stud.chinahw.net/*
// @copyright  Copyright 2012 SoftStar Hangzhou
// ==/UserScript==

var replacements, regex, key, textnodes, node, s;

replacements = {
"72": "100",
"96": "190"
};
regex = {};
for (key in replacements) {
regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
s = node.data;
for (key in replacements) {
s = s.replace(regex[key], replacements[key]);
}
node.data = s;
}