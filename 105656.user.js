// ==UserScript==
// @name Socom Forums
// @author Bocephus205
// @email bocephus@bamajunk.com
// @website http://bamajunk.com
// @description Simple Forum layout
// @include *us.playstation.com/*
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

addGlobalStyle(' body#lia-body .lia-content, .mceContentBody, .mceContentBody th, .mceContentBody td { color: #fff;');

