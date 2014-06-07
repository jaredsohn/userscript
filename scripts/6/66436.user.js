// ==UserScript==
// @name           Remove Invisible Character
// @namespace      Yash
// @include        *
// ==/UserScript==

($ = document.body).innerHTML = $.innerHTML.replace(new RegExp(String.fromCharCode(8238), "g"), "");