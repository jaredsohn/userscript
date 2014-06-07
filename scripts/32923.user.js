// ==UserScript==
// @name           Metalist Colors
// @namespace      http://yodan
// @include        http://www.metalist.co.il/*
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

addGlobalStyle('body, td { background-color:#222 !important;}');
addGlobalStyle('.fixed-a { color:#ccc !important;}');