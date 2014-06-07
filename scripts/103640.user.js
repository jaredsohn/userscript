// ==UserScript==
// @name           Green Comments
// @namespace      Stack Overflow
// @description    Changes code comments color to green (is default gray)
// @include        http://stackoverflow.com/*
// @include        http://*.stackoverflow.com/*
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

addGlobalStyle('code span.com { color: green; }');
