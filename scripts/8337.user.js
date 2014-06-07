// ==UserScript==
// @name          lt4slasher (porn)
// @namespace     
// @description   Blanks out pages with less than four "/" in the URL.
// @include       *
// ==/UserScript==

if (document.location.href.match('/','g').length < 4) { document.location.href='about:blank' }