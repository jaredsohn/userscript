// ==UserScript==
// @name           Facebook FontSize Fixer
// @description    a very small script to fix facebooks new font size to 13 pixels.
// @author         nmcy
// @include        http://*facebook.com/*
// @version        0.1
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

addGlobalStyle('.uiStreamMessage { font-size: 13px ! important; } .commentContent { font-size:13px ! important; }');