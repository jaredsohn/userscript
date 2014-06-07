// ==UserScript==
// @name           Pretty Gmail
// @namespace      micate.gmail
// @description    make gmail looks pretty
// @include        *://mail.google.com/*
// ==/UserScript==

(function() {
var addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}, 

CONFIG = [
    // remove panel scrollbar
    '.age { overflow-x: hidden; }', 
    // remove the new ui tips
    '.w-asK.w-atd { display: none; }'
].join("\n");

addGlobalStyle(CONFIG);
})();
