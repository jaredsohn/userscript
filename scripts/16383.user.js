// ==UserScript==
// @name           Cambio del error 1040
// @namespace      http://diveintogreasemonkey.org/download/
// @include        about:blank
// ==/UserScript==

var 
    i, textnodes, node, s, urlimagen, frase, reemplazo;
    frase = "A database error has occoured (1040). The administrator got a message";
    urlimagen="http://i26.photobucket.com/albums/c140/jedisentinal/simpsons_nelson_haha2.jpg";
    
textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    if (s == frase) {
	reemplazo = document.createElement("imagen");
        reemplazo.innerHTML = "<IMG SRC=\""+urlimagen+"\"></IMG>";
        node.parentNode.replaceChild(reemplazo,node);
    }
}