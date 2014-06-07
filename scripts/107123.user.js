// ==UserScript==
// @name                Remove Google notification count
// @description	        Remove Google notification count from Google pages except Google plus. Also removes from Gmail.
// @version 0.1
// @include		*
// @exclude		https://plus.google.com/*
// // ==/UserScript==


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

addGlobalStyle('#gbgs1{display: none !important}')

