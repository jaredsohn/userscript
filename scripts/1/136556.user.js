// ==UserScript==
// @name           Word Change
// @namespace      none
// @description    Edit and change text of words to your own text[.]
// @include        *
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  
  "ass": "butt",

    
 }; 
 regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

  var replacements, regex, key, textnodes, node, s; 

  replacements = {

   //not case sense

  //safe replace

  "kira": "awesome",

 }; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'gi'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

})();
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  
  "Kira": "Awesome",

    
 }; 
 regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

  var replacements, regex, key, textnodes, node, s; 

  replacements = {

   //not case sense

  //safe replace

  "aaaaaa123456789": "ax6",

 }; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'gi'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

})();
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  
  "Jennibeerd": "Pontoty",

    
 }; 
 regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

  var replacements, regex, key, textnodes, node, s; 

  replacements = {

   //not case sense

  //safe replace

  "Morte": "Gamorade",

 }; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'gi'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

})();
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  
  "Jiggmin": "Our Leader",

    
 }; 
 regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

  var replacements, regex, key, textnodes, node, s; 

  replacements = {

   //not case sense

  //safe replace

  "popcorn": "special VIP extra butter somehow fat free popcorn",

 }; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'gi'); 
} 

textnodes = document[.]evaluate( "//body//text()", document, null, XPathResult[.]UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes[.]snapshotLength; i++) { 
    node = textnodes[.]snapshotItem(i); 
    s = node[.]data; 
    for (key in replacements) { 
        s = s[.]replace(regex[key], replacements[key]); 
    } 
    node[.]data = s; 
} 

})();