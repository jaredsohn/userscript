// ==UserScript==
// @name           SchuelerVZ - Yahoo! Werbung Entfernerin
// @description    Entfernt die Scheiss Werbung 
// @include        http://*schuelervz.net/*
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
addGlobalStyle('div.yahoo_leftnav, #yahoo_hotspot_websearch, #yahoo_hotspot_groups {visibility:hidden!important; display:none!important;} #homelink {background:none!important;}');
