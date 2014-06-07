// ==UserScript==
// @name Namayake
// @description replace "rare" to "namayake"
// @include http://sp.pf.mbga.jp/12008305/*
// ==/UserScript==

var result = document.evaluate(
  '//text()',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = result.snapshotLength-1; i >= 0; --i) {
  var node = result.snapshotItem(i);
  if (node.nodeValue.indexOf('ﾚｱ') < 0) continue;
  node.nodeValue = node.nodeValue.replace(/ﾚｱ/g, '生焼け');
}
