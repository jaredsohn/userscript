// ==UserScript==
// @name           rm_hatena_keyword
// @namespace      yktmt.com
// @include        http://d.hatena.ne.jp/*
// @include        http://anond.hatelabo.jp/*
// ==/UserScript==

(function(){

window.onload = rmKywd(document);


if(window.AutoPagerize){
  window.AutoPagerize.addFilter(function (doc) {
    for (var i=0, l=doc.length; i<l; i++) { rmKywd(doc[i]); }
  });
}else{
  window.addEventListener('GM_AutoPagerizeNextPageLoaded', function(e){ rmKywd(e.target); }, false);
}


function rmKywd(doc) {
  var key = "keyword";
  var xpath = "//a[contains(@href, '" + key + "')]";
  var res = document.evaluate(
    xpath, doc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
  );

  var i, anchor, achild;
  var length = res.snapshotLength
  for (i = 0; i<length; i++) {
    anchor = res.snapshotItem(i);
    achild = anchor.firstChild;
    anchor.parentNode.replaceChild( achild, anchor);
  }
}

})();
