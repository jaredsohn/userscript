// ==UserScript==
// @name        Wiki Citation text replacer
// @namespace   http://userscripts.org/users/67612
// @include     http://*.wikipedia.org/wiki/*
// @grant       none
// @version     1
// ==/UserScript==

var citeLinks = document.querySelectorAll ("a[href*='#cite_note']");
//alert(citeLinks.length);
for (var j = citeLinks.length - 1;  j >= 0;  j--) {
    citeLinks[j].textContent = '-';
}