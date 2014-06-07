// ==UserScript==
// @name           SchuelerVZ im Werder Bremen Style
// @namespace      http://www.schuelervz-designs.de/
// @description    Das SchuelerVZ im Werder Bremen Style ohne Yahoowerbebox.
// @include        http://*schuelervz.net/*
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
addGlobalStyle('@import url(http://www.schuelervz-designs.de/svz/3/svz-bremen.css);');
