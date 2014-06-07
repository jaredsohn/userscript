// ==UserScript==
// @name           Rangerland New Post Getter
// @namespace      kusand.net
// @description    Get new posts instead of last posts!
// @include        http://rangerland.net/forum/*
// ==/UserScript==

var linknodes, node, s;

linknodes = document.evaluate(
    "//a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i = 0; i < linknodes.snapshotLength; i++) {
    node = linknodes.snapshotItem(i);
    s = node.href;
    s = s.replace('view=getlastpost', 'view=getnewpost');
    node.href = s;
}