// ==UserScript==
// @name       Go away facebook garbage
// @namespace  http://cezarywojcik.com
// @version    0.2
// @description  gets rid of the stupid facebook please accept our garbage popup
// @match      http://tampermonkey.net/faq.php?version=3.5.3630.66&ext=dhdg&updated=true
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include         htt*://www.facebook.com/*
// @include         htt*://*.facebook.com/*
// @copyright  2013+, Cezary Wojcik
// ==/UserScript==

setTimeout(function() {
  var eatADickFacebook = document.getElementsByClassName("_10 _5dmd");
  if (typeof eatADickFacebook[0] !== 'undefined') {
    console.log('facebook garbage removed');
    eatADickFacebook[0].remove();
  }
}, 500);
