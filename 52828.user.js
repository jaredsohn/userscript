// ==UserScript==
// @name           FindNReplace
// @namespace      FindNReplace
// @include        http://*.travian.*/*
// ==/UserScript==



(function() {


 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "s": "s",
   "Bod accepteren": "Accepteren",
   "Te weinig grondstoffen": "TWG"};

regex = {};
for (key in replacements) {
   regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.data;
   for (key in replacements) {
       s = s.replace(regex[key], replacements[key]);
   }
   node.data = s;
}

})();