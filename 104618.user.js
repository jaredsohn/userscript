// ==UserScript==
// @name           d_hatena_asin
// @namespace      http://d.hatena.ne.jp/tanku/
// @description    
// @include        http://d.hatena.ne.jp/asin/*
// ==/UserScript==

function getElementsByTagClassName(tag, klass) {
  var tags = document.getElementsByTagName(tag)
  if (tags.length <= 0) {
    return false;
  }
  var rets = []
  for (var i = 0; i < tags.length; ++i) {
    if (tags[i].className == klass) {
      rets.push(tags[i])
    }
  }
  return rets
}

function asinFormAdd() {
  var asin=document.getElementsByName('asin')[0].value;
  var e = getElementsByTagClassName('div', 'more entrydate')[0];
  e.innerHTML += '<p><form><input type="text" name="asin_detail" value="asin:' + asin + ':detail"></form></p>';
}

asinFormAdd();
