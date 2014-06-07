// ==UserScript==
// @name           Reddit Karma Hide
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// @description    Hide all reddit karma
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

addGlobalStyle('.karma { display:none!important; } ');
addGlobalStyle('.user { display:none!important; } ');
addGlobalStyle('.score { display:none!important; } ');