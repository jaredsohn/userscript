// ==UserScript==
// @name           Atmosphir Green Background
// @namespace      VideoGameBacon
// @description    Adds a Green background to Atmosphir
// @include        http://www.atmosphir.com/atmosphir/*
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

addGlobalStyle(' body {background-image: url(http://i34.tinypic.com/2zr2ws0.png); background-attachment: fixed;} ');
addGlobalStyle(' #header .logo > div { color:#AAAAAA; font-size:11px; text-align:right;} ');