// ==UserScript==
// @name           Twitter Kill Heart
// @namespace      http://d.hatena.ne.jp/youpy/
// @description    fxxk valentine
// @include        http://twitter.com/home
// ==/UserScript==

function killHeart(context) {
    $x('//*[starts-with(@id, "heartForm")]', context).forEach(function(e) {
      e.parentNode.parentNode.style.display = 'none';
    });
}

if (window.AutoPagerize) {
  window.AutoPagerize.addFilter(function (pages) {
    pages.forEach(function (page) {
      killHeart(page);
    });
  });
}

killHeart(document);

function $x(exp, context) {
  if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
  var exp = document.createExpression(exp, resolver);
  
  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return len != 0 ? ret : null;
    }
  }
  return null;
}
