// ==UserScript==
// @name        MathJax on Facebook
// @namespace   http://lukas.fragodt.com/mathjaxonfb
// @description Enables use of MathJax on Facebook
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

function loadMathJax() {
  var mathjax = document.createElement('script');
  var head    = (document.head) ? document.head : document.querySelector('head');
  
  mathjax.setAttribute("type", "text/javascript");
  mathjax.setAttribute("src", "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML");
  head.appendChild(mathjax);
}
 
loadMathJax();
