// ==UserScript==
// @name MTG cards!
// @namespace http://userscripts.org/scripts/review/99955
// @description This script enables MTG item links on all pages
// @include *
// ==/UserScript==

   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= 'http://deckbox.org/javascripts/bin/tooltip.js';
   head.appendChild(script);