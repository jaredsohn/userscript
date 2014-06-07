// ==UserScript==
// @name        Goggles overlay
// @description Run Goggles on every single page
// @include     http://*
// @grant none
// ==/UserScript==

(function () {
   if (window.goggles && window.goggles.active) {
     window.goggles.stop();
   } else {
     window.GOGGLE_SERVER='http://goggles.sneakygcr.net/page';
     var scr = document.createElement('script');
     scr.type = 'text/javascript';
     scr.src = 'http://goggles.sneakygcr.net/bookmarklet.js?rand='+Math.random();
     document.documentElement.appendChild(scr);
   }
 })();
