// ==UserScript==
// @name           Hide Reddit Header/Footer
// @namespace      http://www.reddit.com/
// @include        http://*.reddit.com/*
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

addGlobalStyle('div.footer-parent { display: none ! important; }');
addGlobalStyle('div.footer-parent { visibility: hidden ! important; }');
addGlobalStyle('div.sr-header-area { display: none ! important; }');
addGlobalStyle('div.sr-header-area { visibility: hidden ! important; }');
