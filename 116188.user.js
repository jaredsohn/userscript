// ==UserScript==
// @name           Remove github credit card notice
// @namespace      http://userscripts.org/users/351198
// @description    Hide the billing problem notice on github.com until the issue can be resolved
//
// @grant          none
// @include        https://github.com/*
// ==/UserScript==

var e = document.getElementsByClassName("flash-global")[0];
if (e.textContent.indexOf("We are having a problem billing your credit card.") != -1) {
    e.style.display = 'none';
}
