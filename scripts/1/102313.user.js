// ==UserScript==
// @name           MyConfig
// @namespace      http://d.hatena.ne.jp/ABCbo/
// @include        *
// @exclude        http://localhost/*
// ==/UserScript==

// jQueryのセレクタっぽいもの。
// jQueryが読み込まれていない場合のみ有効にする
if (typeof($) == 'undefined') {
  var $ = function(arg) {
    // $("#id"), $(".class"), $("tag"), $("a[href*='next']")
    // 基本E[foo="bar"], ^=(begin), $=(end), *=(contain)
    if (/^[a-zA-Z]$/.test(arg)) {
      return document.getElementsByTagName(arg);
    }
    arg.match(/^(\w+?)?(\.|#)(\w+)$/);
    var tag = RegExp.$1 ? RegExp.$1 : '*';
    var IDorClass = RegExp.$2;
    if (IDorClass == '#') {
      return document.getElementById(RegExp.$3);
    } else if (IDorClass == '.') {
      var arg = tag+"[class*='"+RegExp.$3+"']";
    }
    arg.match(/^([a-zA-Z]+?|\*)\[(\w+?)((?:\^|\$|\*)?=)'([\w\W\d:\/]+?)'\]$/);
    var tag  = RegExp.$1;
    var attr = RegExp.$2;
    var type = RegExp.$3;
    var val  = RegExp.$4;
    if (type == '=') {
      return XPATH("//"+tag+"[@"+attr+"='"+val+"']");
    } else if (type == '^=') {
      return XPATH("//"+tag+"[starts-with(@"+attr+", '"+val+"')]");
    } else if (type == '$=') {
      var len = val.length - 1;
      return XPATH("//"+tag
        +"[substring(@"+attr+", string-length(@"+attr+")-"+len+")='"+val+"']");
    } else if (type == '*=') {
      return XPATH(
        "//"+tag+"[contains(concat(' ', @"+attr+", ' '), '"+val+"')]");
    }
  }
}

// XPATHを通常の配列で返す
function XPATH(expression) {
  try {
    var nodes = document.evaluate(
      expression,
      document,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    alert("Error in XPath '"+expression+"'"+": "+err);
    return null;
  }
  var results = [];
  while (node = nodes.iterateNext()) {
    results.push(node);
  }
  if (results.length == 1) return results[0];
  return results;
}

var url = location.href;
// みるみる動画の続行ボタンを自動的にクリックする
if (/mm-video.net\/\?url=/.test(url)) {
  $("input[value='続行']").click();
// Yahooの記事にはてブ数を追加する
} else if (/(dailynews|headlines).yahoo.co.jp/.test(url)) {
  var link = document.links;
  for (var i = 0; i < link.length; i++) {
    if (link[i].href.match(/http:\/\/b?rd.*(http.*)$/) &&
      !/yahoo.*yahoo/.test(link[i].href)) {
      var href = RegExp.$1;
    } else if (/headlines.yahoo.co.jp\/hl\?a=/.test(link[i].href)) {
      var href = link[i].href;
    } else if (!/yahoo.co.jp/.test(link[i].href)) {
      var href = link[i].href;
    } else {
      continue;
    }
    var img = document.createElement("img");
    img.src = "http://b.hatena.ne.jp/entry/image/" + href;
    link[i].appendChild(img);
  }
// Google画像検索で画像サイズを表示する
} else if (/tbm=isch/.test(url) && !/&tbs=imgo:1/.test(url)) {
  document.location.href = document.location.href+"&tbs=imgo:1";
}