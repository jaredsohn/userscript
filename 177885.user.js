// ==UserScript==
// @name           GTA V.Censor
// @namespace      http://skiyesounds.com
// @description    Prevent spoilers for the PC fans to be updated!
// @include        *youtube.com*
// @include        *GTAForums.com*
// @include        *ign.com*
// @include        *twitter.com*

// ==/UserScript==


(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;
     
	 
      s = s.replace(/GTA V+/gi, "*SPOILER*");
      s = s.replace(/GTA 5+/gi, "*SPOILER*");
      s = s.replace(/GTAV+/gi, "*SPOILER*");
      s = s.replace(/GTA5/gi, "*SPOILER*"); 
	  s = s.replace(/GTA Online/gi, "*SPOILER*");
	  s = s.replace(/GTAonline/gi, "*SPOLIER*");
	  s = s.replace(/Michael+/gi, "*SPOILER*");
	  s = s.replace(/Franklin/gi, "*SPOILER*");
	  s = s.replace(/Trevor/gi, "*SPOLIER*");
	  s = s.replace(/Lamar+/gi, "*SPOILER*");
	  s = s.replace(/Chop/gi, "*SPOILER*");
	  s = s.replace(/Tracey/gi, "*SPOLIER*");
	  s = s.replace(/Amanda+/gi, "*SPOILER*");
	  s = s.replace(/#GTAV/gi, "*SPOILER*");
	  s = s.replace(/Kifflom/gi, "*SPOLIER*");
	  s = s.replace(/Grand Theft Auto V/gi, "*SPOLIER*");
	  s = s.replace(/Grand Theft Auto 5/gi, "*SPOLIER*");



	  
      node.data = s;
   } 

})();


