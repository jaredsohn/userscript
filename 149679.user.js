// ==UserScript==
// @name           Wikipedia 语言链接顺序调整
// @description    将维基百科中的中英文语言链接放到最前面
// @namespace      http://lilydjwg.is-programmer.com/
// @include        http://*.wikipedia.org/*
// @include        http://*.wiktionary.org/*
// @include        https://*.wikipedia.org/*
// @include        https://*.wiktionary.org/*
// ==/UserScript==
 
var links = document.evaluate('//*[@id="p-lang"]//a[text()="中文" or text()="English"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ul;
for(var i=0, len=links.snapshotLength; i<len; i++){
  var link = links.snapshotItem(i);
  ul = ul || link.parentNode.parentNode;
  ul.insertBefore(link.parentNode, ul.firstChild);
}
