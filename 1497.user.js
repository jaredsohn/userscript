// ==UserScript== 
// @name          BushRenamer
// @namespace     http://overstimulate.com/userscripts
// @description   A spade by any other name...
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "George W Bush": "Vacuumous Sucking Noise", 
    "George W. Bush": "Smirking Monkey", 
    "George Bush": "King Chimp", 
    "Bush": "Vacuumous Sucking Noise"}; 

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
