// ==UserScript==
// @name           imeem hide login mask
// @namespace      none
// @include        http://www.imeem.com/*
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

addGlobalStyle('div.mask{visibility:hidden;display:none;}');

