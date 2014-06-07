// ==UserScript==
// @name      Calling a Spade a Spade
// @version	1.0
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
"1 MW Particle laser": "100 MW Particle laser",
"0 / 1": "1 / 1",
"No missiles installed": "NN550 Fleet Missile",
"Tritanium armor": "Adamantium armor",
"Strength x2": "Strength x5",};


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