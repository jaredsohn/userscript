// ==UserScript==
// @name         Hide Twitter Actions Until Rollover
// @namespace    fixTheTwittersNet
// @version      0.4
// @include      /^https?://www\.twitter\.com/.*$/
// @include      /^https?://twitter\.com/.*$/
// @author       John Cline
// @description  This script fixes those stupid twitter actions in the new twitter
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

addGlobalStyle('.tweet .tweet-actions { display: none !important; }');
addGlobalStyle('.tweet:hover .tweet-actions { display: inline-block !important; }');