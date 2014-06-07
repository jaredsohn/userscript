// ==UserScript==
// @name           Camel Footer Hider
// @namespace      com.coderbrandon
// @description    Make the Camel Footer a lot smaller and have opacity
// @include			https://*.tobaccopleasure.com/*
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

addGlobalStyle('#footer {height: 68px;opacity: 0.6;}');