// ==UserScript==
// @name           Blognone Hide Error
// @namespace      Raktai C
// @description    Hide error 
// @include        http://*blognone.com/*
// @include        https://*blognone.com/*
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('div.error{display:none;}');