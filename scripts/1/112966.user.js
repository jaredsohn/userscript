// ==UserScript==
// @name        MathJax for Hacker News
// @description Use MathJax to render math on Hacker News, originally by tzs (http://userscripts.org/users/377102) for Reddit
// @include     http://news.ycombinator.com/*
// @match       http://news.ycombinator.com/*
// @include     https://news.ycombinator.com/*
// @match       https://news.ycombinator.com/*
// ==/UserScript==

(function () {
    var script = document.createElement("script");
    script.type = "text/x-mathjax-config";
    script.text = "MathJax.Hub.Config({" +
                  "  tex2jax: {" +
                  '    skipTags: ["script","noscript","style","textarea"]' +
                  "  }" +
                  "});";
    document.getElementsByTagName("head")[0].appendChild(script);
    
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
    document.getElementsByTagName("head")[0].appendChild(script);
    
    script = document.createElement("script");
    script.type = "text/javascript";
    script.text = "MathJax.Hub.Startup.onload();"
    document.getElementsByTagName("head")[0].appendChild(script);    
})();
