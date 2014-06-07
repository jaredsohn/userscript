// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer" and "change teh into the" by myspace.com/danieldomoracki

// ==UserScript== 
// @name          Change sticky into stickam
// @namespace     http://myspace.com/dh878
// @description   Turns the word sticky into stickam
// @include       * 
// ==/UserScript== 

// seriously...it annoys me this much to warrant a script...whoever started this, you suck.  


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "sticky": "stickam",
    "Sticky": "Stickam",
    "STICKY": "STICKAM",
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