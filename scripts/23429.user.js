// ==UserScript==
// @name          Facebook title topicalizer

// @namespace     http://henrik.nyh.se

// @description   Replaces the "Facebook | " with "FB |" prefix from Facebook titles, so you better can see which page is which in the browser tab bar. Assumes you show favicons in the tab bar, so you can tell the site that way.

// @include       http://*.facebook.com/*
// ==/UserScript==

document.title = document.title.replace(/^Facebook \| /, 'FB \|')
