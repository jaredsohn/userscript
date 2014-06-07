// ==UserScript==
// @name           Script de la clase ic1a para tuenti
// @namespace      Script de la clase ic1a para tuenti
// @include        http://www.tuenti.com/*
// ==/UserScript==

function aniadirEstiloGlobal(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
aniadirEstiloGlobal('.outsideNetwork { opacity:1;); }');
//aniadirEstiloGlobal('a img, img {height:125px;width:125px;); }');
//peta en todo el tuenti