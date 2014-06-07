// ==UserScript==
// @id             twitter_verdunklungsaktion
// @name           Twitter Verdunklungsaktion
// @version        0.01
// @namespace      ffalt
// @author         ffalt
// @description    Paints the Twitter navigation bar black
// @include        https://twitter.com/*
// @run-at         document-end
// ==/UserScript==

function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle('div.global-nav-inner {background:#000}')
addNewStyle('div.global-nav-inner .text {color:#bbb !important}')
