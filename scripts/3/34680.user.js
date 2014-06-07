// auther:  suVene http://zeromemory.sblo.jp/
// version: 0.0.1 2008-09-30

// ==UserScript==
// @name           wasser_hide_res_to_prv
// @namespace      http://zeromemory.sblo.jp/article/20249984.html
// @include        http://wassr.jp/my/*
// @include        http://wassr.jp/user/*
// @include        http://wassr.jp/status/*
// ==/UserScript==

(function() {

  function $X(xpath, pcontext) {
    var context = pcontext || document;
    var doc = context.ownerDocument ? context.ownerDocument : context;
    return doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  function $XEach(xpath, f, pcontext) {
    var r = $X(xpath, pcontext);
    for (var i = 0, max = r.snapshotLength; i < max ; ++i) f(r.snapshotItem(i));
  }

  function toHide(page, requestURL, info) {
    var cnt = 0;
    $XEach('//p[@class="message description"]/span[contains(., "ヒトコトは友達のみ")]/../../..', function(n) {
      n.style.display = 'none';
      cnt++;
    }, page);
  }

  toHide(document);
  if (typeof(window.AutoPagerize) == 'object') {
    window.AutoPagerize.addDocumentFilter(toHide);
  }

})();
