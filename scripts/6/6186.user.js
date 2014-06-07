// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer"

// ==UserScript== 
// @name          LeetSpeak M-Z Caps
// @namespace     none
// @description   Change the internet into leet
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "m": "|\/|",
    "N": "|\|",
    "O": "0",
    "P": "|?",
    "Q": "0,",
    "R": "|)\",
    "S": "5",
    "T": "7",
    "U": "|_|",
    "V": "V",
    "W": "|^|",
    "X": "><",
    "Y": "Y",
    "Z": "2"

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