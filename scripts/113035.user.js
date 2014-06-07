// ==UserScript==
// @name        MathJax for Hacker News
// @description Use MathJax to render math on Hacker News. Forked from mkl_nz (http://userscripts.org/scripts/show/112966). Originally by tzs (http://userscripts.org/users/377102) for Reddit. 
// @include     http://news.ycombinator.com/*
// @match       http://news.ycombinator.com/*
// @include     https://news.ycombinator.com/*
// @match       https://news.ycombinator.com/*
// ==/UserScript==

var head = document.getElementsByTagName("head")[0];

function startMathJax() {
    if (typeof (unsafeWindow.MathJax) != 'undefined') {
        unsafeWindow.MathJax.Hub.Startup.onload();
    } else {
        setTimeout(startMathJax, 10000);
    }
};

var script = document.createElement("script");
script.type = "text/x-mathjax-config";
script.text = "MathJax.Hub.Config({" +
    "  tex2jax: {" +
    '    skipTags: ["script","noscript","style","textarea"]' +
    "  }" +
    "});";
head.appendChild(script);

script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
script.onload = startMathJax;
head.appendChild(script);
