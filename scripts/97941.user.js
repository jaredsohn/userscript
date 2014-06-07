// ==UserScript==
// @name           trove
// @namespace      chrisgray.me
// @include        http://trove.nla.gov.au/ndp/del/article/*
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

addGlobalStyle( '.power-mode .ocr-input .input {font-family: DPCustomMono2,georgia,verdana,times new roman,serif;}');
