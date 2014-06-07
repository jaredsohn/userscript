// Based on a script in Mark Pilgram's "Dive into Greasemonkey"

// ==UserScript== 
// @name          PMOG
// @namespace     http://pmog.com
// @description   Replaces all occurances of "earnt" with "earned"
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "earnt": "earned", 
    "Earnt": "Earned", 
    "EARNT": "EARNED"}; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();