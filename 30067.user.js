// ==UserScript==
// @name           Wikipedia Sister Project Prominence
// @include        http://*.wikipedia.org
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
addGlobalStyle('.infobox.sisterproject {right:3px;position:absolute;top:-27px;width:17em;}');