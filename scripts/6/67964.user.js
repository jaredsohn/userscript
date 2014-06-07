// ==UserScript==
// @name Full Sail Online Reply Image Fix
// @include http://online.fullsail.com/index.cfm
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

addGlobalStyle('.reply_image img { width: auto; }');