// ==UserScript==
// @name Wowhead Links Everywhere
// @namespace CPScripts
// @description This script enables Wowhead item links on all pages
// @include *
// ==/UserScript==

   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= 'http://static.wowhead.com/widgets/power.js';
   head.appendChild(script);