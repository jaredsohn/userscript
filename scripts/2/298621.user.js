// ==UserScript==
// @author         Jarod Sholtz
// @name          Alternet Squeezer
// @namespace      Alternet Squeezer
// @version .1 
// @include        http://www.alternet.org/*
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

addGlobalStyle('#body_main { width: 850px !important; }');
addGlobalStyle('.main_left_column { width: 500px !important; }');
