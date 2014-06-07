// ==UserScript==
// @name           KAM testing
// @description    testing
// @version        1.0
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    'YOUR TEXT HERE ' +
    '</p></div>';
document.body.insertBefore(latestnews, document.body.firstChild);