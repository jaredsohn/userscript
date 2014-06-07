// ==UserScript==
// @name       favorarate
// @namespace  http://d.hatena.ne.jp/koyachi
// @include    http://favotter.matope.com/user.php?user=*
// ==/UserScript==
//
// 2007-12-31 t.koyachi
//

(function(){
  var elmFavorare = $x('//h3')[0];
  var favorare_count = elmFavorare.innerHTML.replace(/.*?のふぁぼられ \((.*?)\).*/, "$1");

  var userid = $x('//h3/a')[0].href.replace(/^http:\/\/twitter\.com\/(.*)$/, "$1");
  ajax('http://twitter.com/' + userid, function(res){
    var htmlDoc = createHTMLDocumentByString(res)
    var elmTwitCount = getFirstElementByXPath('//ul[@class="stats"]/li[4]/span', htmlDoc);
    var twit_count = elmTwitCount.innerHTML.replace(/,/g, "");
    var elmFollowersCount = getFirstElementByXPath('//ul[@class="stats"]/li[2]/span[2]', htmlDoc);
    var followers_count = elmFollowersCount.innerHTML.replace(/,/g, "");

    // http://d.hatena.ne.jp/ono_matope/20071219#1198025223
    var parentPopulation = 850;
//    var favorarate = (favorare_count / (twit_count * followers_count)) * 100;
    var aaa = 100;
    var favorarate = (favorare_count / (twit_count * parentPopulation)) * 100;
    favorarate = (Math.round(favorarate * aaa) / aaa) +'(%)';
    var result = ['<span style="font;color:silver">',
                  'favorare:', favorare_count,
                  'twits:', twit_count,
                  'followers:', followers_count,
                  '</span>',
                  '<span style="font;color:red">',
                  'FAVORARATE =', favorarate,
                  '</span>'
         ].join(' ');
    elmFavorare.innerHTML =  elmFavorare.innerHTML + result;
  });

  function log() {
    if (unsafeWindow.console) {
      unsafeWindow.console.log.apply(unsafeWindow.console,
                                     Array.slice(arguments));
    }
  }

  function ajax(url, onload){
    GM_xmlhttpRequest({
      method : 'get',
      url : url,
      onload : function(res){
        onload(res.responseText);
      }
    });
  }

  function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    htmlDoc.documentElement.appendChild(fragment)
    return htmlDoc
  }

  function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
  }

  function getFirstElementByXPath(xpath, node) {
    var node = node || document
    var result = document.evaluate(xpath, node, null,
                                   XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    // for search element
    var DEBUG_MODE = 0;
    if (DEBUG_MODE) {
      var rule = [".match{border: 3px solid #f00}\n",
                  ".match:after{content:'", xpath, "'}\n"].join('')
      GM_addStyle(rule)
      result.singleNodeValue.className = 
      result.singleNodeValue.className + ' match'
    }
    return result.singleNodeValue ? result.singleNodeValue : null
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
