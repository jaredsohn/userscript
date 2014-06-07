// ==UserScript==
// @name        Fix Feedly code blocks
// @description On cloud.feedly.com many code blocks appear with <br> tags escaped. This makes them unreadable. It may be the issue of particular feeds, or the issue of the feedly itself. This script replaces escaped <br> tags within <pre> blocks with unescaped <br/>s.
// @namespace   https://github.com/astanin
// @include     http://cloud.feedly.com/*
// @version     1
// ==/UserScript==

function fix_pres() {
    var pres = document.getElementsByTagName("pre");
    for (var i=0; i<pres.length; i++) {
        var pre = pres[i];
        pre.innerHTML = pre.innerHTML.replace(/&lt;br ?\/?&gt;/gi, "<br/>");
    }
}

window.setInterval(fix_pres, 2000);
