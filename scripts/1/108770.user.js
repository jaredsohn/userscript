// ==UserScript==
// @name        MathJax for Reddit
// @description Use MathJax to render math on Reddit
// @include     *.reddit.com/r/*
// @include     *.reddit.com/
// ==/UserScript==

(function () {
    var script = document.createElement("script");
    script.type = "text/x-mathjax-config";
    script.text = "MathJax.Hub.Config({" +
                  "  tex2jax: {" +
                  "    inlineMath: [ ['[;', ';]' ] ]," +
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


