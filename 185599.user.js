// ==UserScript==
// @name        Hide ukrpravda Comments
// @description hides all the comments/forum at pravda.com.ua
// @namespace   pravda.com.ua
// @include     http*://*.pravda.com.ua/*
// @version     1
// @grant       none
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

addGlobalStyle('.comment { display: none !important; }');