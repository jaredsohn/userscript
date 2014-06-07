// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey"

// ==UserScript== 
// @name          LimbaughRenamer
// @namespace     http://overstimulate.com/userscripts
// @description   A spade by any other name...
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "Rush Limbaugh": "Noxious Gas Bag ", 
    "Rush": "Assclown", 
    "Limbaugh": "Bloated Sheep Testicles"}; 

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
