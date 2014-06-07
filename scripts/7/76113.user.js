// ==UserScript==
// @name          YouVersion.com Text Notes Popup Fix
// @namespace     YouVersion.com Text Notes Popup Fix
// @description   Reduces the font size for popup study and translation notes in youversion.com
// @include       http://www.youversion.com/*
// @exclude           
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

addGlobalStyle('#tooltip>h3{ font-size: 8pt !important; line-height: normal !important;}');


