// ==UserScript==
// @name        Kongregate Friends 2
// @namespace   http://guidology.com/
// @description Replace Text
// @version     1
// ==/UserScript==
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "Connections": "Friends & Fans",
    "Friends Followed": "Friends",
    "Fans Following": "Fans",
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
