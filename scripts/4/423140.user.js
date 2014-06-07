// ==UserScript==
// @name     Remove recent boards from Trello
// @version  1.0
// @include  https://trello.com/*
// @require  http://code.jquery.com/jquery-1.11.0.min.js
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

addGlobalStyle('.js-recent-boards { display:none !important; }');