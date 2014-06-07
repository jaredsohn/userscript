// ==UserScript==
// @name           No_Background_Clickjacking
// @namespace      www.mnc4.com
// @include        http://www.avclub.com/*
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

addGlobalStyle( '.wallpaper.left a {display: none;}' + '.wallpaper.right a {display: none;}' + '.wallpaper.left {display: none;}' + '.wallpaper.right {display: none;}');