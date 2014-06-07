// ==UserScript==
// @name           Google Plus Comments Colour Fix
// @namespace      http://www.bencoleman.co.uk
// @description    Change the color of comments on Google Plus to be more readable
// @include        https://plus.google.com*
// @include        http://plus.google.com*
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

addNewStyle('.kH {color:black !important;}')