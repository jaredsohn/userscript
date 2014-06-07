// ==UserScript==
// @name           Reddit Sponsored Links Remover
// @namespace      http://nothingoutoftheordinary.com/
// @description    Removes sponsored link/box from the middle of the pages
// @include        http://www.reddit.com/*
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


addGlobalStyle('.promoted.link { display:none!important; } ');