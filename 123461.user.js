// ==UserScript==
// @name          Remove SOPA blackout on Wikipedia
// @author  	  Chuan Shi
// @description   Remove the Wikipedia SOPA Blackout
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @match           http://*.wikipedia.org/*
// @match           https://*.wikipedia.org/*
// ==/UserScript==

$(function() {
  setTimeout(
      function() {
          $("#content, .noprint, #footer").show();
          $("#mw-sopaOverlay, #mw-sopaColumn").hide();
      }, 1000);
});