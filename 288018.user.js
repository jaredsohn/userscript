// ==UserScript==
// @name        Netvibes mark as read and hide
// @namespace   http://www.netvibes.com
// @description Previous Netvibes' behaviour. When you click on the 'mark as read' button, the news is hidden.
// @include     http://www.netvibes.com/*
// @version     2014.01.29
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.head.appendChild(style);
}

addGlobalStyle( '#smartreader-feeds-inner .nv-reader-item.read:not( .open ) { display: none; }' );