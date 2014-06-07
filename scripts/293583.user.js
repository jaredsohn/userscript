// ==UserScript==
// @name        MathJax on Facebook - Rev
// @namespace   http://lukas.fragodt.com/mathjaxonfb
// @description Enables use of MathJax on Facebook
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @version     0.2
// @grant       none
// ==/UserScript==

//Revised version of http://userscripts.org/scripts/show/148312

function loadMathJax() {
  var mathjax = document.createElement('script');
  var head    = (document.head) ? document.head : document.querySelector('head');
  
  mathjax.setAttribute("type", "text/javascript");
  mathjax.setAttribute("src", "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML");
  head.appendChild(mathjax);
}
 
loadMathJax();