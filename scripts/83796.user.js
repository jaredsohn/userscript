// ==UserScript==
// @name           Atmosphir RAINBOW BACKGROUND	
// @namespace      turkeylurkey
// @description    gives the atmosphir website a really neat rainbow background!
// @include        http://beta.atmosphir.com/atmosphir/*
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

addGlobalStyle(' body {background-image: url(http://static.colourlovers.com/uploads/2007/04/rainbow.jpg); background-attachment: fixed;} ');
addGlobalStyle(' #header .logo > div { color:#AAAAAA; font-size:11px; text-align:right;} ');