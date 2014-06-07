// ==UserScript==
// @name           Amazon: Cursor to Search field
// @namespace      amazon
// @description    puts the cursor in the search field when the page loads
// @include        http://*.amazon.com/*
// ==/UserScript==

document.getElementById("twotabsearchtextbox").focus();
