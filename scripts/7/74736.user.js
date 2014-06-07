// ==UserScript==
// @name           SK antiad
// @namespace      http://userscripts.org/scripts/show/74736
// @description    remove ads
// @include        http://*.starkingdoms.com/*
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
addGlobalStyle('.leader,.kingdomFooter,.newbie,.dead,#FilterTD{height:0px ! important;visiblity:hidden ! important;display:none ! important}');

