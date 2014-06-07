// ==UserScript==

// @name          YouTube title topicalizer

// @namespace     http://oz.radiano
// @description   Removes the "YouTube" prefix from YouTube titles, so you better can see which page is which in the browser tab bar. Assumes you show favicons in the tab bar, so you can tell the site that way.

// @include       http://*.youtube.com/*
// ==/UserScript==

document.title = document.title.replace(/^YouTube /, 'UTube ')
