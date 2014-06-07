// ==UserScript==
// @name           MomaThingy
// @namespace      bfg
// @description    Highlight textnodes that start with "MOMA"
// @include        http://*.dd.dev/*
// ==/UserScript==

var bucket = document.getElementsByTagName("body")[0].getElementsByTagName("*");
var e;
for ( var i = 0; i < bucket.length; i++ ) {
    e = bucket[i];
    if (e.innerHTML.indexOf("MOMA")==0) {
        e.style.border="5px solid magenta";
    }
}
