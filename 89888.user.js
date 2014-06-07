// ==UserScript==
// @name          HUNT text Alert
// @namespace      meh
// @description    Alerts For Images
// @include        http://www.delugerpg.com/maps*
// ==/UserScript==
var interval = setInterval(function() {
    if (/shiny/i.test(document.body.innerHTML)) {
        alert("Found It");
    }

}, 1000);