// ==UserScript==
// @name           Hide Self-Serve Advertising Link on Reddit
// @namespace      www.reaverxai.com
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

addGlobalStyle('.tabmenu li:nth-child(8) {display: none;}');