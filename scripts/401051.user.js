// ==UserScript==
// @name MathJax in Quizlet
// @namespace http://www.mathjax.org/
// @description	Mathjax in Quizlet
// @version			1.1
// @include	http://*.quizlet.com/*
// @grant none
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