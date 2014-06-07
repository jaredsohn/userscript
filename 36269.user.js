// ==UserScript==
// @name           Sophistipedia
// @namespace      hanns
// @description    A more decent interface for wikipedia
// @include        http://*.wikipedia.*/*
// @version        0.1
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('@import url(http://14mb.de/u/hanns/wikien.css);');

