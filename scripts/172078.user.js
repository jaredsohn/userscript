// ==UserScript==
// @author      Adil Gunaslan
// @name        Feedly - topWikiWidget always visible
// @description Makes Feedly's topWikiWidget always visible
// @include     http://www.feedly.com/home*
// @include     https://www.feedly.com/home*
// @include     http://cloud.feedly.com/*
// @include     https://cloud.feedly.com/*
// @grant       GM_info
// @version     1.00
// ==/UserScript==

(function() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.home .topWikiWidget { display: block !important; }';
    head.appendChild(style);
})();