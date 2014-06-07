// ==UserScript==
// @name        Bitsoup Enhancer
// @namespace   https://www.bitsoup.me
// @namespace	http://www.bitsoup.org
// @description Enhances usability and looks
// @include     https://www.bitsoup.me/browse*.php
// @include		http://www.bitsoup.org/browse*.php
// @grant		none
// @version     2.0
// ==/UserScript==

var css = "\
table.koptekst tbody > tr:not(:first-child):hover > td { \
    white-space: nowrap; \
    overflow: hidden; \
    text-overflow: ellipsis; \
    min-width: 0; \
    text-shadow: 0 0 8px rgba(64, 64, 255, 0.8); \
    background-color: #CFF; \
    transition: text-shadow 1s, background-color 1s; \
    -webkit-transition: text-shadow 1s, background-color 1s; \
    -moz-transition: text-shadow 1s, background-color 1s; \
    -ms-transition: text-shadow 1s, background-color 1s; \
}";
var tds = document.querySelectorAll('table.koptekst tbody > tr > td:first-child');
for (var td in tds) {
    if (tds.hasOwnProperty(td)) {
        tds[td].style.width = tds[td].getAttribute('width') + 'px';
    }
}
var style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = css;
document.head.appendChild(style);
