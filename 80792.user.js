// ==UserScript==
// @name           Facebook.Censor
// @namespace      http://skiyesounds.com
// @description    Profanity censorship on the web.
// @include        http://*facebook.com*
// ==/UserScript==


(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;
     
	 
      s = s.replace(/fuck+/gi, "*profound*");
      s = s.replace(/cunt+/gi, "*profound*");
      s = s.replace(/shit+/gi, "*profound*");
      s = s.replace(/bitch/gi, "*profound*"); 
	  s = s.replace(/asshole/gi, "*profound*");
	  s = s.replace(/nigger/gi, "*profound*");
	  s = s.replace(/cocksuck+/gi, "*profound*");
	  
      node.data = s;
   } 

})();
