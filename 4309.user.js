// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey"

// ==UserScript== 
// @name          Renamer
// @namespace     TheMediaBlog
// @description   Calling it like it is
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "abortion": " baby murder", 
    "Abortion": "Baby murder",
    "an abortion": "a baby murder",
    "An abortion": "A baby murder",	
    "right to choose": "right to murder babies",
    "pro-choice": "pro-death",
    "Pro-choice": "Pro-death",
    "pro choice": "pro death",
    "Pro choice": "Pro death",
    "Pro-Choice": "Pro-Death", 	 	 
    "abortion clinic workers": "abortion mill workers"}; 

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