// ==UserScript==
// @name           Free WiFi
// @description    Free Wifi URL Trick: ?.jpg
// @include        
// ==/UserScript==
if (window.location.toString().match(".jpg") == null) {
  window.location.replace(window.location + '?.jpg');
}
