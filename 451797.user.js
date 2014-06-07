// ==UserScript==
// @name           YouTube - Use CA region CDN loading
// @namespace      http://userscripts.org/users/23652
// @description    Loads video pages with the Canada CDN
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @include        http://youtube.com/*
// @include        https://youtube.com/*
// @require        https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// @version        1.0.0
// @downloadURL    http://userscripts.org/scripts/source/451797.user.js
// @updateURL      http://userscripts.org/scripts/source/451797.meta.js
// @grant          GM_addStyle
// ==/UserScript==

JSL.runAt('interactive', function () {
    var rGL = /&gl=[a-zA-Z]+/;

    function modifyLinks() {
        JSL('a[href*="/watch?v="]:not([href*="&gl=CA"])').each(function (link) {
            link.href = link.href.replace(rGL, '') + '&gl=CA';
        });
    }

    if (typeof JSL !== 'undefined') {
        JSL.setInterval(modifyLinks, 1000);
    }
});