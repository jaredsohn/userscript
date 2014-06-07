// ==UserScript==
// @name           SchuelerVz in Dunkelblau by switchnow.de
// @namespace      http://www.switchnow.de
// @description    Blaues Design für das SchuelerVZ
// @include        http://*schuelervz.net/*
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
addGlobalStyle('@import url(http://www.switchnow.de/anderes/dblau.css);');