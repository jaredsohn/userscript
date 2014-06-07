// ==UserScript==
// @name           Hatena Anond Expand Trackback Tree
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    はてな匿名ダイアリーのトラックバックツリーをはじめから開いた状態にする
// @include        http://anond.hatelabo.jp/*
// @match          http://anond.hatelabo.jp/*
// ==/UserScript==

(function() { 
  var links = $X( '//div[@class="refererlist"]/descendant::li/descendant::a[1]' ),
      ids;
  
  var executeBrowserContext = function(ids) {
    if ( /chrome/i.test(window.navigator.userAgent) ) { 
      location.href="javascript:(function(){ [ " + ids.toString() + "].forEach(function(id) { window.toggleTBContent(id); }) })()";
    } else {
      ids.forEach(function(id) {
        unsafeWindow.toggleTBContent(id);
      });
    }
  }
  
  ids = links.filter(function(link) {
    return link.className !== 'self' && link.href.match(/^http:\/\/anond\.hatelabo\.jp/); // 今開いているエントリーのトラックバックは開かない
  }).map(function(link) {
    return link.href.match(/\d+/); 
  });
  
  executeBrowserContext(ids);

  // https://gist.github.com/29681
  function $X (exp, context, resolver, result_type) {
    context || (context = document);
    var Doc = context.ownerDocument || context;
    var result = Doc.evaluate(exp, context, resolver, result_type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (result_type) return result;
    for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
      res[i] = result.snapshotItem(i);
    }
    return res;
  }
})();