// ==UserScript==
// @name           КГБizer
// @namespace      none
// @description    Edit and change text of words to your own text.
// @include        *
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  
  "ФСБ": "КГБ",
  "Федеральная служба безопасности": "Комитет Государственной Безопасности",

  

    
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

  var replacements, regex, key, textnodes, node, s; 

  replacements = {

   //not case sense

  //safe replace

    "ФСБ": "КГБ",
    "Федеральная служба безопасности": "Комитет Государственной Безопасности",


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



