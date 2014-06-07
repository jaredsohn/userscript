// ==UserScript== 
// @name          nbspFixer 
// @namespace     http://userscripts.org
// @description   replaces   (without the required semicolon) with a proper &nbsp;
// @include       * 
// ==/UserScript== 

(function() {
  var textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

 for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

    if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
    {
      s = node.data; 
      s = s.replace("&nbsp", '\u00A0');
      node.data = s; 
    }
 } 

})();