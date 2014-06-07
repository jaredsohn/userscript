// ==UserScript==
// @name     Remove related youtubes in sidebar
// @include  http://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

var badElements = $("span:contains('ryse')");

badElements.parent ().remove ();