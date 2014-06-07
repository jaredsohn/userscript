// ==UserScript==
// @name           Google reader readability improvements
// @description    Big serif font, centered fixed-width column and dimmed background color for Google Reader.
// @namespace      https://userscripts.org/scripts/show/153111
// @updateURL      https://userscripts.org/scripts/source/153111.user.js
// @downloadURL    https://userscripts.org/scripts/source/153111.user.js
// @version        2012.11.27
// @include        *google.com/reader/view/*
// @grant          none
// ==/UserScript==

var style = document.createElement('style');
style.innerHTML = '' +
    '.entry .entry-main { margin: 0 auto; width: 700px; }' +
    '.card { background: #f7f7f7;  !important }' +
    '.entry-body { font: normal 20px/30px Georgia, sans-serif !important; color: #333 !important; }' +
    '';

document.getElementsByTagName('head')[0].appendChild(style);