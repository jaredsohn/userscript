// ==UserScript==
// @name        VPLAY(dot)RO Ads Removal
// @namespace   http://www.bfssl.tk
// @description This script removes the ads from VPLAY(dot)RO
// @include     http://vplay.ro/*
// @include     https://vplay.ro/*
// @include     http://www.vplay.ro/*
// @include     https://www.vplay.ro/*
// @grant       none
// @version     0.9
// ==/UserScript==
function addStyle(cssStyle) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssStyle;
    head.appendChild(style);
}
addStyle("div.wvad, div.dark-page-content div > a[href='http://loveyou.do/'],div.sqpadd { display: none !important; }");

//EOF