// ==UserScript==
// @name          Page not found created by Death Eater
// @include       http://www.orkut.com/*
// ==/UserScript==
window.addEventListener("load", function(e) {
if(document.getElementsByTagName('b').item(1).innerHTML.indexOf('Page not found')>=0)
window.location.reload( false );
}, false);