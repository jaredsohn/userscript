// ==UserScript==
// @name           Google books ad remover
// @namespace      geological-supplies.com
// @description    Removes advertising from Google Books
// @include        http://books.google.com/*
// ==/UserScript==

if (document.getElementById("bottom_ad"))document.getElementById("bottom_ad").style.display="none";