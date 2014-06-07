// ==UserScript==
// @name        Userscripts.org - Reload on 502 Bad Gateway
// @namespace   http://userscripts.org/users/23652
// @description Reloads when the pages gives a 502 error
// @include     http://userscripts.org/*
// @include     https://userscripts.org/*
// @copyright   JoeSimmons
// @version     1.0.3
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL http://userscripts.org/scripts/source/168240.user.js
// @updateURL   http://userscripts.org/scripts/source/168240.meta.js
// ==/UserScript==

// Make sure the page is not in a frame
if (window.self !== window.top) { return; }

// run on full page load
window.addEventListener('load', function () {

    // get the H1 element with the '502 Bad Gateway' text
    var h1 = document.evaluate('//body/center/h1[.="502 Bad Gateway"]', document.body, null, 9, null).singleNodeValue;

    // simple random number generator
    function rand(max, min) {
        var num = Math.random() * max;
        while (num < min) {
            num = Math.random() * max;
        }
        return Math.floor(num);
    }

    // check if the H1 exists and the title is '502 Bad Gateway'
    if (document.title === '502 Bad Gateway' && h1) {

        // reload the page sometime in the next 2 seconds
        setTimeout(function () {
            location.href = location.href.split('#')[0];
        }, rand(1250, 500) );

    }

}, false);