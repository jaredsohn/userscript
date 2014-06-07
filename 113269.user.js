// ==UserScript==
// @name       Test
// ==/UserScript==
var allTextNodes = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),
    // some temp references for performance
    tmptxt,
    tmpnode,
    // compile the RE and cache the replace string, for performance
    cakeRE = /Tadej/g
    replaceValue = "pie";

// iterate through all text nodes
while (allTextNodes.nextNode()) {
    tmpnode = allTextNodes.currentNode;
    tmptxt = tmpnode.nodeValue;
    tmpnode.nodeValue = tmptxt.replace(cakeRE,replaceValue);
}