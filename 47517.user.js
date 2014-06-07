// Based on a script in Mattie_2's Eliminate all excessive exclamation points
// Changes exclamations to periods.

// ==UserScript== 
// @name          Eliminate all exclamations
// @namespace     http://www.shunramedia.com
// @description   Turns any exclamation marks into periods. For Orbar & Ygurvitz
// // @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "!": ".",

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
