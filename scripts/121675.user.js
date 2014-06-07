// ==UserScript==
// @name           Facebook Un-Yahoo-ify
// @namespace      http://www.facebook.com
// @description    Make Yahoo links go straight to the page
// @include        http://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


$("#home_stream").on("click", "a[href*='redirect_uri']", function(event){

  var x = $(this).attr("href");
  var redirIndex = x.indexOf("redirect_uri");
  var eqIndex = x.indexOf("=",redirIndex);
  var ampIndex = x.indexOf("&",redirIndex);

  window.open(unescape(x.substring(eqIndex+1,ampIndex)));

  return false;

});