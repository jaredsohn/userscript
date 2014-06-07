// ==UserScript==
// @name          For personal use
// @author  	  Chuan
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @match          http://*.phrasemix.com/*
// ==/UserScript==

$(function() {
  setTimeout(
      function() {
          $('.media-pass-article').show();
          $('.media-pass-preview').hide();
      }, 1000);
});