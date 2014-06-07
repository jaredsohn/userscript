// ==UserScript==
// @name           MM AutoClicker
// @namespace      155857
// @description    Automatically Clicks on the Yes Button in Meet Me section of Tagged.com
// @include        http://wvvw.tagged.com/meetme.html
// ==/UserScript==

window.addEventListener("load", function(e) {
window.setInterval(function() {
unsafeWindow.game.interest(true);
}, 250);
}, false);