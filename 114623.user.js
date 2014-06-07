// ==UserScript==
// @name           Makedonija
// @author	   bocevski
// @namespace      edited by bocevski
// @description    Makedonija not FYROM Erepublik
// @include        http://www.erepublik.com/*
// @copyright      bocevski
// @version        1.0.4
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
	"Republic of Macedonia *": "Macedonia ",
	"(FYROM) *": "Македонија",
	"Greece *": "Гејлада ",
	"Resistance Force Of *": "Востаници на ",
    };

	

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'gi'); 
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