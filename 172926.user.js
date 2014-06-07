// ==UserScript==
// @name       The to Ћ Ћ script Ћ movie
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  LOOK AT ME BEING A GUD CODER DUDE
// @match      http://*/*
// @copyright  2012+, Me and Digits.
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
      "the": "Ћ",
	//""  : "", //use this to make your own
    };

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'ig'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data;
	//s = s.toLowerCase();
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 



})();