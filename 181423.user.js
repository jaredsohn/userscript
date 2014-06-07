// ==UserScript==
// @name        Hide Spiegel Comments
// @description hides all the comments/forum at spiegel online
// @namespace   thollsten.spiegel
// @include     http*://www.spiegel.de/*
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

addGlobalStyle('.article-comments-box { display: none !important; }');
