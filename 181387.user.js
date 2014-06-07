// ==UserScript==
// @name       MathJax for Reddit
// @namespace  
// @version    0.1
// @description Enables MathJax on reddit for the TeXtheWorld delimiters [; ... ;].
// @match      http://*.reddit.com/*
// @copyright
// ==/UserScript==
if (window.MathJax === undefined) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
    var config = 'MathJax.Hub.Config({ ' + 'extensions: ["tex2jax.js"], ' + 'tex2jax: { skipTags: ["script","noscript","style","textarea"],inlineMath: [ ["[;", ";]"] ], displayMath: [["[(;",";)]"]], processEscapes: true }, ' + 'jax: ["input/TeX", "output/HTML-CSS"] ' + ' }); ' + 'MathJax.Hub.Startup.onload(); ';
    if (window.opera) {
        script.innerHTML = config
    } else {
        script.text = config
    }
    document.getElementsByTagName("head")[0].appendChild(script);
    (doMathJax = function () {
        window.setTimeout(doMathJax, 1000);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    })();

} else {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
