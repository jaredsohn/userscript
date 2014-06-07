// ==UserScript==
// @name        Disable Hatena Keyword for LDR Full Feed
// @namespace   http://d.hatena.ne.jp/Constellation/
// @include     http://reader.livedoor.com/reader/*
// @include     http://fastladder.com/reader/*
// @description Disable Hatena Keywords with LDR Full Feed
// @privilege   false
// @version     0.0.1
// ==/UserScript==

(function(){
var f = function (doc, url, info){
  var reg = /(^http:\/\/d\.hatena\.ne\.jp|^http:\/\/.+?.g\.hatena\.ne\.jp\/bbs|^http:\/\/(.)*?\.g\.hatena.ne\.jp\/|^http:\/\/anond\.hatelabo\.jp\/)/;
  if ( !url.match(reg) ) {
    return;
  }
  var keywords = getElementsByXPath('//a[(@class="keyword") or (@class="okeyword")]', doc);
  if (keywords) {
    for (var i = 0; i < keywords.length; i++){
      var n = keywords[i];
      var r = document.createElement('span');
      r.className = 'keyword';
      for (var j = 0; j < n.childNodes.length; j++){
        r.appendChild(n.childNodes[j].cloneNode(true));
        n.parentNode.replaceChild(r, n);
      }
    }
  }
};

addFilter(f)

function addFilter(filter, i) {
  i = i || 4
  if (window.FullFeed&& window.FullFeed.addDocumentFilter) {
    window.FullFeed.addDocumentFilter(filter)
  }
  else if (i > 1) {
    setTimeout(arguments.callee, 1000, filter, i - 1)
  }
}

function getElementsByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return (data.length >= 1) ? data : null
}
})();