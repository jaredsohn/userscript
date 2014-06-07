// ==UserScript==
// @name       MathJax for Dozensonline
// @namespace  http://userscripts.org/users/322169
// @version    0.2
// @description  Enables use of MathJax (including LaTeX support) on Dozensonline.
// @include    http://z13.invisionfree.com/DozensOnline/*
// @copyright  2012, James Wood
// ==/UserScript==

(function() {
    var script = document.createElement('script');
    script.setAttribute('src', 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
    (document.head || document.querySelector('head')).appendChild(script);
})();