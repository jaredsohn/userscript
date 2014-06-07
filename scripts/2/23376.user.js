// ==UserScript==

// @name          Gmail title topicalizer

// @namespace     http://oz.radiano
// @description   Removes the "Gmail" prefix from Gmail titles, so you better can see which page is which in the browser tab bar. Assumes you show favicons in the tab bar, so you can tell the site that way.

      // @include       http://mail.google.com/*
      // @include        https://mail.google.com/*
      // @include        http://*.mail.google.com/*
      // @include        https://*.mail.google.com/*


// ==/UserScript==

document.title = document.title.replace(/^Gmail /, 'G')
