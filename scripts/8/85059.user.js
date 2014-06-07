// ==UserScript==
// @name           Warosu to KimWipes
// @namespace      http://twitter.com/Yuichirou
// @include        http://*
// @include        https://*
// ==/UserScript==

var nodes = document.evaluate('//text()[contains(., "ｗ")]', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0, length = nodes.snapshotLength; i < length; i++) {
    var node = nodes.snapshotItem(i);
    node.nodeValue = node.nodeValue.replace(/ｗ/g, "キムワイプ");
}
