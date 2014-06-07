// ==UserScript== 
// @name          E-Peen 
// @namespace     http://userscripts.org
// @description   Substitute E-Penis for Tumblarity
// @include       http://www.tumblr.com/* 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 
s = s.replace( /\bTumblarity\b/gi, "E-PENIS");

    node.data = s; 
		}
} 

})();
