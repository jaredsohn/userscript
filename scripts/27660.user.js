// ==UserScript==
// @name          Plurk logo and creature remover
// @namespace      http://mikeontv.com/
// @description    Removes the logo and creature from Plurk.com timeline.
// @include        *plurk.com*
// ==/UserScript==
addGlobalStyle('#dynamic_logo {display:none;}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}