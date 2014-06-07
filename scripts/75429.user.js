// ==UserScript==
// @name           panataddons
// @namespace      AD
// @description    para sa mga meet me
// @include        http://www.tagged.com/meetme.html
// @include        http://www.tagged.com/meetme.html
// ==/UserScript==
window.addEventListener("load", function(e) {
window.setInterval(function() {
unsafeWindow.game.interest(true);
}, 250);
}, false);