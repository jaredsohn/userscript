// ==UserScript==
// @name           Monopoly Mod
// @namespace      rretzbach
// @include        http://www.fuzzyboard.de/monopoly_main.php
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

addGlobalStyle('.myback { background-image: url(http://tinyurl.com/ypkevo); }');