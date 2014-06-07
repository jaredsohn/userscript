// ==UserScript==
// @name        chagashi
// @namespace   http://userscripts.org/users/59751
// @description 高級茶菓子と高級和菓子を高森藍子にする
// @include     http://sp.pf.mbga.jp/12008305/*
// ==/UserScript==

function chagashi(root) {
  var result = document.evaluate(
    ".//text()",
    root,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for (var i = result.snapshotLength - 1; i > 0; --i) {
    var node = result.snapshotItem(i);
    var text = node.nodeValue;
    if (text.indexOf('高級') < 0) continue;
    node.nodeValue = text.replace(/高級[茶和]菓子/g, "高森藍子");
  }
}
chagashi(document);
var handler = function(e) { chagashi(e.target) }
window.addEventListener('AutoPagerize_DOMNodeInserted', handler, false);
window.addEventListener('AutoPatchWork.DOMNodeInserted', handler, false);
window.addEventListener('AutoPagerAfterInsert', handler, false);
