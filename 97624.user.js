// ==UserScript==
// @name           Only Arrow
// @namespace      http://userscripts.org/users/297132
// @description    Disable the change of cursor
// @include        *
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

addGlobalStyle('* {cursor: default ! important; }');