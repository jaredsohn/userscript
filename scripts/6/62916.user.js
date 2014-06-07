// Based on http://userscripts.org/scripts/show/53038

// ==UserScript==
// @name          Remove Redundant Punctuation
// @namespace     http://userscripts.org/users/83966
// @description   Reduces redundant ! and ? to a single character. Ahhh.
// @include       *
// ==/UserScript==

(function(){
  var replacements, regex, key, textNodes, node, nodeData;
  replacements = {
   "!+": "!",
   "\\?+": "?",
   "(!\\?){2,}": "!?",
   "(\\?!){2,}": "?!",
   "[\.]{3,}": "...",
  };

  regex = {};
   for (key in replacements) {
   regex[key] = new RegExp(key, 'g');
  } 

  textNodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

  for (var i = 0; i < textNodes.snapshotLength; i++) {
   node = textNodes.snapshotItem(i);
   if (!(node.data.match(/^\s*$/))) {
     nodeData = node.data;
     for (key in replacements) {
       nodeData = nodeData.replace(regex[key], replacements[key]);
     }
     node.data = nodeData;
  }
 }
})();