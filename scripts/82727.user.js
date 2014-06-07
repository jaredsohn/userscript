// ==UserScript==
// @name           Profanity Censor
// @namespace      http://bob23646.deviantart.com/
// @description    blocks out profound words
// @include        *
// ==/UserScript==

(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;
     
	  s = s.replace(/shit/gi, "----");
	  s = s.replace(/bitch/gi, "-----");
	  s = s.replace(/fuck/gi, "----");
	  s = s.replace(/damn/gi, "---");

      node.data = s;
   } 

})();