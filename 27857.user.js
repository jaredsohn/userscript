// ==UserScript==
// @name           AutoPagerize Linkable exampleUrl
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://wedata.net/databases/AutoPagerize/items*
// ==/UserScript==

function linkable() {
    $x('//th[text()="exampleUrl"]/following-sibling::node()[2]').forEach(function(e) {
      if(e.childNodes.length == 1 && e.innerHTML.match(/^http/)) {
	e.innerHTML = '<a href="' + e.innerHTML + '">' + e.innerHTML + '</a>';
      }
    });
}

if (window.AutoPagerize) {
  window.AutoPagerize.addFilter(function (pages) {
    linkable();
  });
}

linkable();

function $x(exp, context) {
  if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
  var exp = context.createExpression(exp, resolver);

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
