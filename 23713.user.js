// ==UserScript==
// @name           Stallman Goggles
// @namespace      http://vostok6.net
// @description    Richard Stallmans Goggles
// @include        *
// ==/UserScript==


(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;

      s = s.replace(/(L|l)inux/g, "GNU/Linux");
      //javascript and regexp can go to hell!!!
      s = s.replace(/GNU\/GNU\/Linux/g, "GNU/Linux");

      s = s.replace(/Digital Restrictions Management/g, "Digital Restrictions Management"); 

      s = s.replace(/(O|o)pen(\s*|-)(S|s)ource/g, "Pseudo-Free Software");             

      node.data = s;
   } 

})();