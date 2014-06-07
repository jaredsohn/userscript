// Coded with help from Mark Pilgram's upcoming "Dive into Greasemonkey", as well as based on "renamer"

// ==UserScript== 
// @name          No nigger
// @namespace     Jeremy(organdonor)
// @description   Turns the word "nigger" and a few of it's derivatives into "African American(s)"
// @include       * 
// ==/UserScript== 

// Why?  Because some people take the internet too seriously.


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "Nigger*": "African American",
    "nigger*": "African American",
    "Niggers*": "African Americans",
    "niggers*": "African Americans",
    "NIGGER*": "African American",
    "NIGGERS*": "African Americans",

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