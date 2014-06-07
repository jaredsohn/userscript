// ==UserScript==
// @name        CommaFeed
// @namespace   safetux
// @grant       none
// @description Optimized CommaFeed for Persian (farsi) language with "Droid Arabic Naskh" font
// @author      Hojjat Ali Mohammadi
// @include     http*://*.commafeed.*
// ==/UserScript==
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.entry-body-content, .entry-heading, .shrink, .entry-title, h1, h2, h3, h4, h5, h6, a { font-family: "Droid Arabic Naskh" !important; text-align: justify; }';
document.getElementsByTagName('head')[0].appendChild(style);