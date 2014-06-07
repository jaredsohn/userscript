// ==UserScript==
// @name           Sophistipedia de
// @namespace      hanns
// @description    Ein etwas gehobeneres Aussehen für Wikipedia
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

addGlobalStyle('@import url(http://14mb.de/u/hanns/wikide.css);');

