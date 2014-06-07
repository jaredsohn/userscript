// ==UserScript==
// @name           SeGhePias...
// @namespace      http://userscripts.org
// @description    "dio se ghe pias" on facebook
// @include        http://www.facebook.com/
// @include        http://www.facebook.com/*
// ==/UserScript==


function replace_string(search, replace) {
  textNodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  var searchRE = new RegExp(search,'gi');
  for (var i=0;i<textNodes.snapshotLength;i++) {
    var node = textNodes.snapshotItem(i);
    node.data = node.data.replace(searchRE, replace);
  }
}

replace_string("mi piace", "Dio se me pias...");
replace_string("piace", "dio se ghe pias")
