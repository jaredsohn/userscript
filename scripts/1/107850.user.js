// ==UserScript==
// @name           Help Skopje get an identity
// @namespace      http://www.klika.me
// @description    Will Fix a serious error in the game.
// @include        http://www.erepublik.com/*
// @copyright      KliKA Corp.
// @version        0.0.3
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
	"Republic of Macedonia *": "Skopje "
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

