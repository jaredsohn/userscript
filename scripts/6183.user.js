// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer"

// ==UserScript== 
// @name          LeetSpeak A-L
// @namespace     none
// @description   Change the internet into leet
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "a": "@",
    "b": "|3",
    "c": "(",
    "d": "|)",
    "e": "3",
    "f": "|[",
    "g": "6",
    "h": "|-|",
    "i": "|",
    "j": "_|",
    "k": "|<",
    "l": "|_",

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