// ==UserScript==
// @name           Twitter ReBlogger
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://twitter.com/*
// ==/UserScript==

var h = 0;

function rebloger(){
  if((h + 300) < document.body.offsetHeight) {
      $x('//td[@class="content"]').forEach(function(e) {
        if(!e.rebloggable) {
          e.rebloggable = true;

          var img = $x('descendant::img[contains(@src, "icon_star_empty.gif")]', e)[0];
          if(img) {
            img.addEventListener('click', function() {
              post('@reblog ' + $x('descendant::span[@class="entry-title entry-content"]', e)[0].textContent.replace(/^\s+/, ''));
            }, false);
          }
        }
      });
    
    h = document.body.offsetHeight;
  }
}

rebloger();
setInterval(rebloger,2000);

function post(msg) {
  var status = encodeURIComponent(msg);
  var url = 'http://twitter.com/statuses/update.json';
  GM_xmlhttpRequest({
    method : 'POST',
    url : url,
    data: 'status=' + status,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
    }
  });
}

// cho45 - http://lowreal.net/
function $x(exp, context) {
  if (!context)
    context = document;
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
