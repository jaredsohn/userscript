// ==UserScript==
// @name           Google Groups Font Changer
// @version        1.3.1
// @creator        Adriano Prado
// @description    Changes the font family and size from Google Groups page
// @namespace      userscripts.org
// @include        http://groups.google.com/*
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

addGlobalStyle('.fontsize2 { font-family: Georgia; font-size: 15px; }');
