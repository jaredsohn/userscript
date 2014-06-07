//
// ==UserScript==
// @name          Goodreads Review Avatar Icon Upsizer
// @namespace     http://robotarmyma.de/gr_icon
// @description	  Change Icon Size
// @include       http://www.goodreads.com/*
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

addGlobalStyle('.reviewText > a > img { width:50px;}');

