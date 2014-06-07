// ==UserScript==
// @name           Super.cz - Prdelka
// @namespace      http://tools.surovcak.cz/greasemonkey
// @description    Ze Super.cz jen prdelku!
// @include        http://super.cz/*
// @include        http://www.super.cz/*
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

addGlobalStyle('#page { display: none ! important; }');