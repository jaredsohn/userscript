// ==UserScript==
// @name           PipesFullFeed - Insert feed url to Wedata item entry
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    
// @include        http://wedata.net/databases/PipesFullFeed/items*
// ==/UserScript==
//
// 2008-06-18 t.koyachi
//


(function(){
  var icon = E('img', {
    src: "http://pipes.yahoo.com/favicon.ico",
    style: "border-width: 0px"
  });
  $x('//div[@class="entry-content"]').forEach(function(item) {
    var html = item.innerHTML;
    var feedUrl = html.match(/<th>feed_url<\/th>\n\s*?<td>(.*?)<\/td>/)[1];
    var tagFrom = html.match(/<th>tag_from<\/th>\n\s*?<td>(.*?)<\/td>/)[1];
    var tagTo = html.match(/<th>tag_to<\/th>\n\s*?<td>(.*?)<\/td>/)[1];
    var url = ["http://pipes.yahoo.com/pipes/pipe.run?_id=Zt_T2W_03BGAC5oAA8qenA&_render=rss&feed=",
               encodeURIComponent(feedUrl),
               '&from=' + encodeURIComponent(tagFrom),
               '&to=' + encodeURIComponent(tagTo)
               ].join('');
    var elmTr = E('tr');
    var elmTh = E('th', "PipesFullFeedURL");
    var elmTd = E('td', E('a', {href: url}, icon, url));
    elmTr.appendChild(elmTh);
    elmTr.appendChild(elmTd);
    item.appendChild(elmTr);
  });


  // util
  function E() {
    var tag = Array.prototype.shift.call(arguments);
    var elm = document.createElement(tag);
    
    var text = [];
    Array.prototype.forEach.call(arguments, function(value) {
      if (!value) return;
        
      if (value && value.nodeType) {
        elm.appendChild(value);
        return;
      }
      
      switch (typeof(value)) {
      case 'string':
      case 'number':
        elm.appendChild(document.createTextNode(value))
        break;
        
      default:
        for (var key in value) {
          var attr = value[key];
          switch (key) {
          case 'class': elm.className = attr;
          case 'style': elm.style.cssText = attr;
          default:      elm.setAttribute(key, attr);
          }
        };
        break;
      }
    });
    return elm;
  }

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