// Based on Michael Sarver's "Nice Shot!" script which was based on a script in Mark Pilgram's "Dive into Greasemonkey" 

// ==UserScript==
// @name          MOAR!
// @author	  craym0nk (with help from other scripts)
// @namespace     http://userscripts.org/
// @description   Replaces the 'more' button on twitter.com with 'MOAR!'
// @include       http://twitter.com/*
// ==/UserScript==

//******************************************************************
// 2008.03.25 - v0.1
//******************************************************************

(function() {
 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "more": "MOAR!",
   "More": "MOAR!"};

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