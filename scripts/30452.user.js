// ==UserScript==
// @name           pretty printed grdii
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    
// @include        http://youpy.jottit.com/grd*
// ==/UserScript==
//
// 2008-07-23 t.koyachi
//   inspired by http://twitter.com/hysysk/statuses/866034698

(function(){
  var htmContent = $x('id("content")/p')[0].innerHTML.split(/=/).join(" / ");
  var htmDateline = document.getElementById("dateline").innerHTML;
  var htmFooter = document.getElementById('footer').innerHTML;
  document.getElementById('content_wrapper').innerHTML =
    ['<div id="content" style="background:#B8BAB7;color:#FFFFFF;font-weight:bolder;padding:1em;line-height:1.08em">',
     htmContent,
     '<div id="dateline">' + htmDateline + '</div>',
     '</div>',
     htmFooter
     ].join('');

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
