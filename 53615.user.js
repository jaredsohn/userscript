// ==UserScript==
// @name           omg i cant c!!1
// @namespace      omg i cant c!!1
// @description    Removes the pretty transparency from the navigation menu.
// @include        http://*bungie.net/*
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

addGlobalStyle('.rmVertical {background:#1B1D1F;}');