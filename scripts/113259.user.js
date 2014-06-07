// ==UserScript==
// @name           Faction23 Temp SGPlus Firefox Fix
// @description    Fixes input display bug for firefox running SGPlus 1.6 addon
// @author         Faction23
// @website        http://www.faction23.com/
// @version        0.001
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
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

addGlobalStyle('.m-n-f-ba-rd iframe {height:auto !important; width:100% !important; color:#000 !important;}');