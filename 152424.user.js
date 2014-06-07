// ==UserScript==
// @name           hiiiiiiiiiiiiiiiiiiiiiiiiiii
// @namespace      Personal
// @include        www.jiggmin.com*
// @include        jiggmin.com*
// @include        *jiggmin.com*
// @include        jiggmin.com/forum.php*
// @description    test
// ==/UserScript==

document.body.style.background = "#0000FF";
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://jiggmin.com/-images/jiggmin-logo.png") {
         ilist[i].src = "http://i.imgur.com/3fBuc.png";
    }
}
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://jiggmin.com/styles/halloween/logo.jpg") {
         ilist[i].src = "http://i.imgur.com/3fBuc.png";
    }
}

document.body.style.fontSize = "14px";

document.body.style.member = "#FF0000";

document.body.style.color = "#FF0000";

document.body.style.member.color = "#FF0000";

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  
  "047B7B": "FF0000",

    
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

  "noob.txt": "noob.txt",

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