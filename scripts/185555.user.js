// ==UserScript==
// @name        CORGination
// @namespace   http://www.thejfx.net
// @description Replaces names with corgi varients
// @version     1
// @grant       none
// ==/UserScript==

var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
 
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    var s = node.data;

    s = s.replace(/( )[CDGK]?[oOuU][rR][gGbBtTnNmMdD]?/, "$1CORG");

    node.data = s;
} 