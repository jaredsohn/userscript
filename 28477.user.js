// ==UserScript==
// @name           removeHatenaKeyword
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http://d.hatena.ne.jp/*
// @include        http://*.g.hatena.ne.jp/*
// @include        http://anond.hatelabo.jp/*
// ==/UserScript==
(function() {

  var removeHatenaKeyword = function() {
    var s = location.host.indexOf('g.hatena.ne.jp') == -1 ? 'keyword': 'okeyword';
    var k = document.getElementsByClassName(s);
    return function() {
      while (k.length) k[0].parentNode.replaceChild(k[0].firstChild, k[0]);
    }
  } ();

  removeHatenaKeyword(document.body);

  window.AutoPagerize && window.AutoPagerize.addFilter(removeHatenaKeyword);
})()

