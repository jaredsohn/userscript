// ==UserScript==
// @name           给希望叫果酱猫果猫酱的人用
// @author         tgmerge
// @version        1.1
// @match          http://www.qsc.zju.edu.cn/*
// ==/UserScript==

var textnodes, node, s;

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data.replace("\u679c\u9171\u732b", "\u679c\u732b\u9171");
    node.data = s;
}