// ==UserScript==
// @name Trafictube Fullscreen Enabler
// @namespace http://www.trafictube.ro/
// @version 0.1
// @description Enables the fullscreen support for the HTML5 video player
// @match http://www.trafictube.ro/*
// @copyright 2014+, SaltwaterC
// @author SaltwaterC
// @updateURL http://userscripts.org/scripts/source/479243.user.js
// @downloadURL http://userscripts.org/scripts/source/479243.user.js
// ==/UserScript==

var idx, iframe, src, iframes = document.getElementsByTagName('iframe');

for (idx in iframes) {
    if (iframes.hasOwnProperty(idx)) {
        iframe = iframes[idx];
        if (typeof iframe === 'object') {
            src = iframe.getAttribute('src');
            if (src !== null && src.match(/www\.youtube\.com\/embed/)) {
                iframe.setAttribute('allowfullscreen', 1);
            }
        }
    }
}
