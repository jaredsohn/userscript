// ==UserScript==
// @name        adf.ly skipper (adblock)
// @namespace   adskipper
// @description skips adf.ly pages that block you for using adblock
// @include     http://adf.ly/*
// @version     1
// @run-at         document-start
// ==/UserScript==

var changed = 0; // script need to be edited with

window.addEventListener('beforescriptexecute', function(e) {
src = e.target.innerHTML;
if (src.indexOf('zzz') > -1) {
    var re = new RegExp("zzz.*?(http.*?)'");
    var trueUrl = re.exec(src)[1];
    window.removeEventListener(e.type, arguments.callee, true);
    window.location = trueUrl;
}

}, true);
