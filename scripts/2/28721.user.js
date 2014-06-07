// ==UserScript==
// @name           tako3 search redirect
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    use with smark keyword. set url="http://tako3.com/search/%s", key="tako3", then type "tako3 koyachi" in location bar.
// @include        http://tako3.com/search/*
// ==/UserScript==
//
// 2008-06-19 t.koyachi
//

(function(){
  document.location.href = $x('//li/a')[0].href;

  function $x(exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o
               : (document.contentType == "text/html")
                 ? ""
                 : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return ret;
      }
    }
    return null;
  }
})();
