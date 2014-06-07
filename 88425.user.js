// ==UserScript==
// @name        Twitter Dock Badge
// @namespace   http://fluidapp.com
// @description Update unread twitter count on dock badge
// @include     http://twitter.com/
// @include     http://twitter.com/*
// @author      Peng Deng <dengpeng@gmail.com>
// ==/UserScript==

(function () {
    if (window.fluid) {
        setInterval(function updateBadge() {
            var counts = /\d+/.exec(document.title);
            if (counts && counts[0] > 0) {
                window.fluid.dockBadge = counts[0] > 99 ? '99+' : counts[0];
            } else {
                window.fluid.dockBadge = '';
            }
        }, 2000);
    }
})();