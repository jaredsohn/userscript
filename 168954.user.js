// ==UserScript==
// @name       嘿嘿嘿嘿
// @version    1.1
// @description  请叫我Lolikyon
// @match      http://www.qsc.zju.edu.cn/*
// @copyright  2012+, You
// ==/UserScript==

var textnodes, node, s;

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data.replace("Kyon", "Lolikyon");
    node.data = s;
}