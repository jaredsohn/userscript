// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey"

// ==UserScript== 
// @name          LDS Women's Curriculum Link Adder
// @namespace     none
// @description   Helping the Church get the website right
// @include       http://library.lds.org/nxt/gateway.dll/Curriculum/young%20women.htm* 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "Conclusion": " Conclusion <body> <p> <a href="http://library.lds.org/nxt/gateway.dll/Curriculum/young%20women.htm/resource%20guide%20for%20young%20women%20manual%201.htm">Young Women's Resource Guide</a>  </body> </html> ", 
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

