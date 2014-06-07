// ==UserScript==
// @name        NinjaKiwi - Ad Remover
// @namespace   http://userscripts.org/users/23652
// @description Removes ads for less lag. AdBlock hides them but they're still there, wasting PC power
// @include     http://ninjakiwi.com/Games/*/*.html
// @include     https://ninjakiwi.com/Games/*/*.html
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL http://userscripts.org/scripts/source/173500.user.js
// @updateURL   http://userscripts.org/scripts/source/173500.meta.js
// @require     http://userscripts.org/scripts/source/172971.user.js
// @run-at      document-start
// ==/UserScript==

(function () {

// Make sure the page is not in a frame
if (window.self !== window.top) { return; }

window.addEventListener('load', function(event) {

    var blacklist = [
        '#video',
        '*[id^="top-ad-"]',
        '*[id^="div-gpt-ad-"]',
        '*[id^="cpmstar"]',
        'iframe[id*="ads"]',
        'iframe[name*="ads"]',
        'iframe[src*="ads"]',
        'iframe[src*="doubleclick.net"]',
        'iframe[src*="adclick"]'
    ],
    slice = Array.prototype.slice;

    blacklist.forEach(function (value) {
        var elements = JSL.queryAll(value);

        if(elements.length > 0) {
            slice.call(elements).forEach(JSL.remove);
        }
    });

}, false);

}());