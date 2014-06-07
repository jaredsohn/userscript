// ==UserScript==
// @name          MathJax Trello
// @description	  Apply Mathjax to Trello
// @include       https://trello.com/*
// ==/UserScript==

// Thanks to http://userscripts.org/scripts/review/401051
if (window.MathJax === undefined) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
  var config = 'MathJax.Hub.Config({ ' + 'extensions: ["tex2jax.js"], ' + 'tex2jax: { skipTags: ["script","noscript","style","textarea"],inlineMath: [ ["$", "$"] ], displayMath: [["\\\\[","\\\\]"]], processEscapes: true }, ' + 'jax: ["input/TeX", "output/HTML-CSS"] ' + ' }); ';// + 'MathJax.Hub.Startup.onload(); ';
  config += '(function doMathJax(){ window.setTimeout(doMathJax, 1000); window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]); })();';
    if (window.opera) {
      script.innerHTML = config;
    } else {
      script.text = config;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
} else {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}