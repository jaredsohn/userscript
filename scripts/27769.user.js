// ==UserScript==
// @name           text to image
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        *
// ==/UserScript==

function toImageURL(hexString) {
  var s = hexString;
  for(var i = 0; i < (4 - hexString.length); i ++) {
    s = '0' + s;
  }
  
  return 'http://www.decodeunicode.org/data/glyph/26x26/' + s + '.gif';
}

$x('//text()').forEach(function(textNode) {
  var span = document.createElement('span');
  textNode.data.split('').map(function(c) {
    return c.charCodeAt(0).toString(16).toUpperCase();
  }).forEach(function(hexString) {
    if(!hexString.match(/^(A|20|9)$/)) {
      var img = document.createElement('img');
      img.src = toImageURL(hexString);
      img.className = 'text_to_image';
      span.appendChild(img);
    }
  });
  
  textNode.parentNode.replaceChild(span, textNode);
});

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

GM_addStyle(<><![CDATA[
		       img.text_to_image {
			 border: none;
		       }
		       ]]></>);
