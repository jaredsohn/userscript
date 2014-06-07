// ==UserScript==
// @name           fanfou-tex
// @namespace      fanfou
// @include        http://fanfou.com/*
// ==/UserScript==

(function() {
    var config = {
        tex2jax: { element: 'stream', ignoreClass: ['op', 'stamp'] },
        MMLorHTML: { perfer: { Firefox: 'HTML' } }
    };
    var $c = function(tag) { return document.createElement(tag); };
    var $head = document.getElementsByTagName('head')[0];
    var $style = $c('style');
    $style.innerHTML = '#MathJax_Message { display: none; }';
    $head.appendChild($style);
    var $config = $c('script');
    $config.innerHTML =
        'MathJax.Hub.Config(' + JSON.stringify(config) + ');' +
    $config.addEventListener('afterscriptexecute', function() {
        this.type = 'text/x-mathjax-config';
    }, true);
    $head.appendChild($config);
    var $script = $c('script');
    $script.src = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js' +
        '?config=TeX-AMS_HTML';
    $head.appendChild($script);
})();