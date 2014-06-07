// ==UserScript==
// @name           Bigger is Better (frog)
// @namespace      http://robotarmyma.de/big_button-frog
// @description    Book Show - Help to find buy button
// @include        http://www.goodreads.com/*
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

addGlobalStyle('#imagecol .dropButton .button {font-size:0em;width:255px; height:130px ; background-position: -20px -20px; background-image: url(http://s3.amazonaws.com/uso_ss/icon/85281/large.jpg?1283453323); !important;}');

