// ==UserScript==
// @name           NotNotte
// @namespace      http://userscripts.org
// @description    No more notte, no more wot.
// @include        http://discworld.atuin.net*
// ==/UserScript==

(function() {
  var replacements, regex1, regex2, key, textnodes, node, s; 

  replacements = { 
    "notte": "not", 
    "Notte": "Not",
    "NOTTE": "NOT",
    "wot": "what",
    "Wot": "What",
    "WOT": "WHAT"};

regex1 = {}; 
for (key in replacements) { 
    regex1[key] = new RegExp(key, 'g'); 
} 

regex2 = {}; 
for (key in replacements) { 
    regex2[key] = new RegExp(key, 'gi'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex1[key], replacements[key]); 
    } 
    for (key in replacements) { 
        s = s.replace(regex2[key], replacements[key]); 
    } 
    node.data = s; 

} 

})();

