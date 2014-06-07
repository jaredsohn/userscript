// ==UserScript==
// @name           xkcd Filters
// @namespace      http://userscripts.org
// @description    takes xkcd fora filters and applies them to every page you view
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 
s = s.replace( /\blol\b/gi, "¡This cheese is burning me!");
s = s.replace( /\bchuck norris\b/gi, "Saladin's Mom");
s = s.replace( /\bfeminine wiles\b/gi, "**misogyny not found**");
s = s.replace( /\blost the game\b/gi, "lost twenty dollars and my self respect");
s = s.replace( /\bqft\b/gi, "IFLP");


    node.data = s; 
		}
} 

})();

