// ==UserScript==
// @name       Safety Protecter
// @namespace  http://www.sshz.co.cc/
// @version    0.1
// @description  半自动修改stud.chinahw.net的成绩
// @include    http://stud.chinahw.net/*
// @copyright  Copyright 2012 SoftStar Hangzhou 版权所有 2012 邪恶轴心老牌资本主义大帝国杭软野心狼！
// ==/UserScript==

// 自动更新功能没有被启用。

var replacements, regex, key, textnodes, node, s;

replacements = {
"语文：72": "语文：100",
"数学：96": "数学：196"
};
regex = {};
for (key in replacements) {
regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
s = node.data;
for (key in replacements) {
s = s.replace(regex[key], replacements[key]);
}
node.data = s;
}