// ==UserScript==
// @name           Fok Cleaner (Disable adblock)
// @namespace      patrick
// @include        *forum.fok.nl*
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

css = " #skyscraper { position: relative; left: -10000px; overflow:hidden !important; } ";
css += " .adfieldbg { height: 1px !important;  min-height: 1px !important; overflow:hidden !important; } ";
addGlobalStyle(css);