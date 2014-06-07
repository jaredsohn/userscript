// ==UserScript==
// @name           regchulafix
// @namespace      reg chula fix
// @include        http*://www.reg.chula.ac.th/*
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

addGlobalStyle('.levelone { position: relative; }');