// ==UserScript==
// @name           LastFm.Censor
// @namespace      http://skiyesounds.com
// @description    Profanity censorship on the web.
// @include        http://*last.fm*
// ==/UserScript==


(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;
     
	 
      s = s.replace(/fuck+/gi, "last.fm!!!");
      s = s.replace(/cunt+/gi, "last.fm!!!");
      s = s.replace(/shit+/gi, "last.fm!!!");
      s = s.replace(/bitch/gi, "last.fm!!!"); 
	  s = s.replace(/asshole/gi, "last.fm!!!");
	  s = s.replace(/nigger/gi, "last.fm!!!");
	  s = s.replace(/cocksuck+/gi, "last.fm!!!");
	  
      node.data = s;
   } 

})();