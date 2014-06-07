// Based on a script in Mark Pilgram's "Dive into Greasemonkey"

// ==UserScript==
// @name          That guy
// @author	  V.S.
// @namespace     http://cantstandthatguy/
// @description   Replaces the name of a guy you don't like with whatever
// @include       http://www.facebook.com/*
// @include  	  http://www.new.facebook.com/*
// ==/UserScript==



(function() {
 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "Some name": "that guy"};


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