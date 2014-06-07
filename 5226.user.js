// ==UserScript==
// @name           hide myspace address book
// @description    hides address book
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("home_searchAddressBook");
if (b) {b.parentNode.removeChild(b);}




