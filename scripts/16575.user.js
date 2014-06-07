// ==UserScript==
// @name           Hype Machine replace feed link
// @namespace      http://d.hatena.ne.jp/youpy/
// @description    replace feed link to podcast link
// @include        http://hypem.com/*
// ==/UserScript==

$x('//a[@class="rss"]').forEach(function(e) {
  e.href = 
  e.href
    .replace(/\.com\/feed\//, '.com/playlist/')
    .replace(/(\d+)\/feed\.xml/, 'rss/$1/feed.xml');
});

// cho45 - http://lowreal.net/
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
      return ret;
    }
  }
  return null;
}
