// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer"

// ==UserScript== 
// @name          Change Teh into The
// @namespace     http://myspace.com/danieldomoracki
// @description   Turns annoying teh into the 
// @include       * 
// ==/UserScript== 

// Why 42?  We should ask Earth before it is too late.


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "teh": "the",
    "Teh": "The",
    "TEH": "THE",
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
