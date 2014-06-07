// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer"
// Adapted to only replace multiple exclamation marks with the ‼ character.

// ==UserScript== 
// @name          Eliminate all excessive exclamation points
// @namespace     http://mattie.info
// @description   Turns 2 or more exclamation points into just ‼
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "[!]{2,}": "‼",

    };

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
