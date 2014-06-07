// ==UserScript==
// @name          Donuts for you
// @namespace     http://Orkut-Revolution.co.nr
// @description	  Refreshes Automatically if orkut says: 'no donuts for you'
// @include       http://www.orkut.co.in/*
// ==/UserScript==
window.addEventListener("load", function(e) {
if(document.getElementsByTagName('b').item(1).innerHTML.indexOf('Bad, bad server. No donut for you.')>=0||document.getElementsByTagName('b').item(1).innerHTML.indexOf('Page not found')>=0)
window.location.reload( false );
}, false);