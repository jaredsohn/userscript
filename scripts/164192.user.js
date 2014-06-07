// ==UserScript==
// @name          Remove Background Image
// @description   Remove any background images.
// @include       http://e-razkazi.info/*
// ==/UserScript==

(function() {
  document.body.style.backgroundImage = "none";
  document.body.style.background  = "#FFFFFF";
})();