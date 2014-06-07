// ==UserScript==
// @name           Bash.Filter
// @namespace      http://www.xbox360forum.com
// @description    Bash filter on X3f
// @include        *
// ==/UserScript==


(function() {

   var textnodes, node, s; 

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; i++) { 
      node = textnodes.snapshotItem(i); 
      s = node.data;
     
	 
      s = s.replace(/raptors+/gi, "BLARGH");
      s = s.replace(/Toronto+/gi, "BLARGH");
      s = s.replace(/Canada+/gi, "BLARGH");
      s = s.replace(/canadian+/gi, "BLARGH");
      s = s.replace(/Solomon Alabi+/gi, "BLARGH");
      s = s.replace(/Alabi+/gi, "BLARGH");
      s = s.replace(/Leandro Barbosa+/gi, "BLARGH");
      s = s.replace(/Barbosa+/gi, "BLARGH");
      s = s.replace(/Andrea Bargnani+/gi, "BLARGH");
      s = s.replace(/Bargnani+/gi, "BLARGH");
      s = s.replace(/Jerrd Bayless+/gi, "BLARGH");
      s = s.replace(/Bayless+/gi, "BLARGH");
      s = s.replace(/Jose Calderon+/gi, "BLARGH");
      s = s.replace(/Ed Davis+/gi, "BLARGH");
      s = s.replace(/Davis+/gi, "BLARGH");
      s = s.replace(/DeMar DeRozan+/gi, "BLARGH");
      s = s.replace(/DeRozan+/gi, "BLARGH");
      s = s.replace(/Amir johnson+/gi, "BLARGH");
      s = s.replace(/James Johnson+/gi, "BLARGH");
      s = s.replace(/Linas Kleiza+/gi, "BLARGH");
      s = s.replace(/Kleiza+/gi, "BLARGH");
      s = s.replace(/Dwane Casey+/gi, "BLARGH");
      s = s.replace(/Vince Carter+/gi, "BLARGH");
      s = s.replace(/Carter+/gi, "BLARGH");
      s = s.replace(/Chris Bosh+/gi, "BLARGH");
      s = s.replace(/Bosh+/gi, "BLARGH");
	  
      node.data = s;
   } 

})();
