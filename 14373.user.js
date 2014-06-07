// ==UserScript==
// @name           Fourteen ways to make your Twitter-life happy
// @namespace      http://d.hatena.ne.jp/Cormorant/
// @description    あなたのtwitterライフを幸せにする14の方法
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        1.0.1
// ==/UserScript==
//
// last modified: 2007/11/23 13:34:18
//


(function() {

  var i = 4, tableNo = 1, onAddFilter = false
  var home = !!location.href.match(/twitter.com\/home/i)

  var addFilter = function() {
    onAddFilter = home ? true : false
    if (window.AutoPagerize && window.AutoPagerize.addFilter) {
      window.AutoPagerize.addFilter(parse)
    } else if (i-- > 0) {
      setTimeout(arguments.callee, 1000)
    }
  }

  var parse = function() {
    var c = ['\u51E6\u5973',
             '\u30CB\u30FC\u30C8',
             '\u59B9',
             '\u773C\u93E1',
             '\u30E1\u30A4\u30C9',
             '\u4E2D\u5B66\u751F',
             '\u4F53\u64CD\u670D',
             '\u8150\u5973\u5B50',
             '148cm',
             '\u306E\u604B\u4EBA']
    var x = '//table[@class="doing" and position()='+tableNo+']//*[@class="hentry"]//*[@class="content"]//strong//a'
    var n = onAddFilter ? $X('//div[@class="bottom_nav"]'+x) : $X(x)
    var m

    n.forEach(function(v){
      var i = v.innerHTML.charCodeAt(0) + ''; i = i.charAt(i.length-1)
      var o = ''

      if (i == 9) { o = m ? m : 'Hamachiya2' }

      m = v.innerHTML
      v.innerHTML = m + ' (14\u6B73/' +o+c[i]+ ')'
    })

    tableNo++
  }

  var $X = function (exp, context) {
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

  parse()
  addFilter()

  if (home) tableNo = 1

})()
