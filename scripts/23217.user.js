// ==UserScript==

// @name          Ynet title topicalizer

// @namespace     http://oz.radiano
// @description   Removes the "Ynet" prefix from Ynet titles, so you better can see which page is which in the browser tab bar. Assumes you show favicons in the tab bar, so you can tell the site that way.

// @include       http://*.ynet.co.il/*
// ==/UserScript==

document.title = document.title.replace(/^[y|Y]net /, 'Y ')
