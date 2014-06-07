// ==UserScript==

// @name           Softpedia Crap Remover
// @description    Removes the unusefull links from the top of the page.
// @include        http://forum.softpedia.com/*
// ==/UserScript==

 (function() {

var deSters = document.getElementsByTagName('table')[3];
deSters.parentNode.parentNode.parentNode.style.display = "none";

 })();