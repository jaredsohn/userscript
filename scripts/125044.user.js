// ==UserScript==
// @name           google links
// @description    disables link redirection in search results
// @version        1.4
// @license        Public Domain
// @grant          none
// @include        http://www.google.*
// @include        https://www.google.*
// @include        https://encrypted.google.*
// ==/UserScript==

(function() {
    var win = unsafeWindow || window;
    function patch() {
        var links = win.document.evaluate("//h3[@class='r']/a[@onmousedown]", win.document, null, 7, null);
        for (var a, i = 0; a = links.snapshotItem(i); i++) {
            a.removeAttribute('onmousedown');
        }
    }
    patch();
    setInterval(patch, 400);
})();
;