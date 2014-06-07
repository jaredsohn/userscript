// ==UserScript==
// @name           MathJax on Stack Exchange
// @namespace      mathjax
// @include        http://math.stackexchange.com/*
// @include        http://meta.math.stackexchange.com/*
// ==/UserScript==

var document = unsafeWindow.document;

function insertMathJax(){
  var head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://www.finestructure.com/MathJax/MathJax.js';
  head.appendChild(script);
}

insertMathJax();