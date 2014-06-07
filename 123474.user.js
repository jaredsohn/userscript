// ==UserScript==
// @name           Wikipedia anti-blackout
// @namespace      GuySoft
// @include        http://en.wikipedia.org/*
// @include        http://*.wikipedia.org/*
// @include        https://*.wikipedia.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @description	  Disable wikipedia blackout screen on https and http
// ==/UserScript==

$(function() {
  setTimeout(
      function() {
          $("#mw-page-base, #mw-head-base, #content, #mw-head, #mw-panel, #footer").show();
          $("#mw-sopaOverlay").hide();
      }, 1000);
});