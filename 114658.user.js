// ==UserScript==
// @name           Force Vertical Scrollbar on All Pages
// @namespace      Hur
// @include        *
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

addGlobalStyle('head { overflow-y: scroll ! important; }');