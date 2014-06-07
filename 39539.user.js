// ==UserScript==
// @name           Hide YouTube Language Box
// @version        1.01
// @namespace      http://userscripts.org/users/363/
// @description    Hides the annoying and intrusive language selection box at the top of the page.
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==

document.getElementById("default-language-box").style.display = "none";