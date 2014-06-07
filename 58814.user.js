// ==UserScript==
// @name           10=5@>@57:0
// @namespace      weststats
// @include        http://ru.weststats.com/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('#right {display:none;}');
addGlobalStyle('th {normal:normal}')