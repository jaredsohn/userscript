// ==UserScript==
// @name           TBG MathJax
// @namespace      http://www.tbg.org/
// @description    Insert MathJax into TBG
// @include        http://www.tbg.nu/*
// ==/UserScript==

// Slightly modified from a script at
// http://docs.mathjax.org/en/v1.1-latest/dynamic.html

if ((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null) {
    var script = document.createElement("script");
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full";
    var config = 'MathJax.Hub.Startup.onload()';
    if (window.opera) {script.innerHTML = config} else {script.text = config}
    document.getElementsByTagName("head")[0].appendChild(script);
}
