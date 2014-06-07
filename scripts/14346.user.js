// ==UserScript==
// @name          houseco url modify
// @namespace     http://d.hatena.ne.jp/samurai20000/
// @description	  modify url external link
// @include       http://www.houseco.jp/db/*
// ==/UserScript==

(function() {
    var path = "//div[@id='architect']/*/*/span/a";
    var url = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    url.target = '_blank';
    url.href = url.innerHTML;
})();


