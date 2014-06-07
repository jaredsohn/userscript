// ==UserScript==
// @name       B&R-Enhance
// @namespace  http://userscripts.org/scripts/show/165026
// @version    0.1
// @description  Corrección CSS B&R
// @match      https://pro01.ia.lacaixa.es/apw5/dkpbkp/*
// @copyright  2013+, Yo!
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

addGlobalStyle('.content li { display:inline-block ! important; } table tbody th, table tbody td {font-size: small;} #cellContainerActions{width:70%}' );