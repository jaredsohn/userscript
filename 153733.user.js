// ==UserScript==
// @name           google-noredirect
// @namespace      tools
// @description    stop google links redirect
// @include        http://www.google.com*
// @include        https://www.google.com*
// ==/UserScript==

(function() {
    window.addEventListener('load', function() {
        if (document.querySelectorAll) {
            Array.prototype.forEach.call(
                document.querySelectorAll('h3.r > a'),
                function(elem) {
                    elem.onmousedown = function() {};
                }
            );
        }
    });
})();