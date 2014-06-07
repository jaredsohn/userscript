// ==UserScript==
// @name                MathJax for Douban
// @namespace           http://code.miffyliye.org/userscripts/mathjax-douban
// @description         This script enables MathJax from cdn.mathjax.org for www.douban.com
// @version             0.3
// @updateURL           http://code.miffyliye.org/userscripts/downloads/mathjax-douban.meta.js
// @downloadURL         http://code.miffyliye.org/userscripts/downloads/mathjax-douban.user.js
// @grant               none
// @include             http://www.douban.com/*
// @include             https://www.douban.com/*
// @include             http://site.douban.com/*
// @include             https://site.douban.com/*
// @include             http://book.douban.com/*
// @include             https://book.douban.com/*
// ==/UserScript==
(function () {
  var head = document.getElementsByTagName("head")[0], script;
  script = document.createElement("script");
  script.type = "text/x-mathjax-config";
  script[(window.opera ? "innerHTML" : "text")] =
    "MathJax.Hub.Config({\n" +
    "  tex2jax: {\n" +
    '    inlineMath: [ ["\\\\(","\\\\)"],["[;",";]"] ],\n' +
    '    displayMath: [ ["\\\\[","\\\\]"],["$$","$$"] ],\n' +
    "    processEscapes: true,\n" +
    "    processEnvironments: true,\n" +
    '    skipTags: ["script","noscript","style","textarea","pre","code"]\n' +
    "  },\n" +
    '  TeX: { equationNumbers: { autoNumber: "AMS" } }\n' +
    "});";
  head.appendChild(script);
  script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
  head.appendChild(script);
})();
