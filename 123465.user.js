// ==UserScript==
// @name           new_wiki
// @namespace      wahtaj(noushy)
// @include        http://en.wikipedia.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(function() {
  setTimeout(
      function() {
          $("#mw-page-base, #mw-head-base, #content, #mw-head, #mw-panel, #footer").show();
          $("#mw-sopaOverlay").hide();
      }, 1000);
});