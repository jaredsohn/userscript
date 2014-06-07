// ==UserScript==
// @name           Something Awful OP recoloring
// @namespace      http://www.mathemaniac.org
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript==

// Rewritten with help from Shawn Moore (sartak.org)

GM_addStyle('.oppost { background-color: #FFF2AA !important; border-collapse: collapse } ');

var xpath = '//table[descendant::dt[contains(@class, "op")]]//td';
var it = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
var node;
var nodes = new Array();
while (node = it.iterateNext()) {
    nodes.push(node);
}

while (node = nodes.pop()) {
    node.className += ' oppost';
}


