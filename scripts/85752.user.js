// ==UserScript==
// @name           Facebook
// @namespace      http://www.alagu.net/
// @include        *.facebook.com/*
// ==/UserScript==
if(document.getElementById("pagelet_home_stream"))
  document.getElementById("pagelet_home_stream").innerHTML = '';
