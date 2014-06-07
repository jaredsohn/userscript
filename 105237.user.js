// ==UserScript==
// @name www.torontoMLS.net tabs
// @namespace  http://userscripts.org/users/cyber9
// @description  Fixes the missing tabs Stratus Infocenter pages
// @include http://www.torontoMLS.net/*
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

addGlobalStyle('#Tab1Row1 td a {position:relative!important; left:0px!important; top:3px!important; display:block!important;padding-top:0!important;line-height:24px!important;color:#000!important;} #Tab1Row1 td span {display:none!important;}');