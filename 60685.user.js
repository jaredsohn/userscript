// ==UserScript==
// @name           RIP Rippy
// @namespace      what.cd
// @version        1.0
// @description    GTFO RIPPY!
// @include        https://ssl.what.cd/*
// @include        http://www.what.cd/*
// ==/UserScript==

var riprippy = document.getElementsByClassName('rippy');
if (riprippy) {
    riprippy[0].parentNode.removeChild(riprippy[0]);
}