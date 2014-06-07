// ==UserScript==
// @name        Farkle w/Yammer
// @namespace   http://fluidapp.com
// @description Farkle's around with the sidebar, preserving who's currently online
// @include     *
// @author      Jim Halberg
// ==/UserScript==

(function () {
window.setTimeout(farkle, 2);
})();

function farkle(){
    // move online-now
    onlineNow = document.getElementById('online-now');
    onlineNow.style.display;

    columnTwo = document.getElementById('column-two');
    columnTwo.parentNode.insertBefore(onlineNow, columnTwo);
}