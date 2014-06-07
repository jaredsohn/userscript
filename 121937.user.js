// ==UserScript==
// @name           Slime
// @description    For your essential sliming needs.
// @include        http://www.tumblr.com/*
// @version        2.0.1
// ==/UserScript==

var slime = document.getElementById("detection_alert");

if (slime) {
   document.body.style.overflowX = "auto";
   document.body.style.overflowY = "auto";
   slime.parentNode.removeChild(slime);
   var overlay = document.getElementById("overlay");
   if (overlay) {
      overlay.parentNode.removeChild(overlay);
   }
}

