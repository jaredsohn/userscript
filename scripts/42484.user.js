// ==UserScript==
// @name           Mona
// @description    Mona font for 420chan
// @include        http://420chan.org/*
// @include        http://img.420chan.org/*
// @include        http://disc.420chan.org/*
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

addGlobalStyle('.reply blockquote, blockquote :last-child { font-family: mona }');