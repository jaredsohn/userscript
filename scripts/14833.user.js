// ==UserScript==
// @name           TTIW.com Don't Show Purchases
// @namespace      http://thethingsiwant.com
// @description    Doesn't show if someone has bought me something on thethingsiwant.com
// @include        http://www.thethingsiwant.com/*
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


addGlobalStyle('.item { background-color:#ebf0f5 !important; }');
addGlobalStyle('.ItemPur { display:none !important; }');
addGlobalStyle('.item pur { display:none !important; }');
addGlobalStyle('.purchase { display:none !important; }');