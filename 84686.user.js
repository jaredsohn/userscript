// ==UserScript==
// @name           Atmosphir Blue Background
// @namespace      scupizzaboy
// @description    Restores the blue background to the Atmosphir website
// @include        http://*atmosphir.com/atmosphir/*
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

addGlobalStyle(' body {background-image: url(http://img683.imageshack.us/img683/4403/bluef.png); background-attachment: fixed;} ');
addGlobalStyle(' #header .logo > div { color:#AAAAAA; font-size:11px; text-align:right;} ');