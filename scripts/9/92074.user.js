// ==UserScript==
// @name           Return to Homepage
// @namespace      Return to Homepage
// @description    Add menu to return to Homepage of current website (Rightclick Greasemonkey)
// @include        *
// ==/UserScript==

function homepage(){
var domein = 'http://'+document.domain;
window.location.href = domein;
}

GM_registerMenuCommand("Homepage", homepage);