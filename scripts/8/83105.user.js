// ==UserScript==
// @name           Google footer
// @namespace      gg
// @include        http://www.google.ro/
// ==/UserScript==
var lang = document.getElementById('als');
var footer = document.getElementById('footer');
lang.parentNode.removeChild(lang);
footer.parentNode.removeChild(footer);