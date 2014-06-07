// ==UserScript==
// @name           Reveal Pic
// @namespace      http://userscripts.org
// @include        *facebook.com*
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

theStyle = ".app_tab span {visibility: visible !important}"
addStyle(theStyle);