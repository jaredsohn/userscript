// ==UserScript==
// @name           Bancomer Ad Remover
// @namespace      http://none.com
// @description    Bancomer Ad Remover
// @include        https://www*.bbvanet.com.mx/*
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

addGlobalStyle('#Layer1 { display: none ! important; }');