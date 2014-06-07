// ==UserScript==
// @name          Skip Top Frame Ads
// @namespace     http://loucypher.cjb.net/
// @include       http://www.techtales.com/tftechs.html
// @include       http://*.detik*.com/*
// @description	  Skip top frame ads and go directly to the second frame
// ==/UserScript==

(function() {
  frameset = document.getElementsByTagName('frameset')[0];
  if (frameset) {
    bottomFrame = document.getElementsByTagName('frame')[1];
    document.location.href = bottomFrame.src;
  }
})();
