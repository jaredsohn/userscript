// ==UserScript==
// @name           chowtimes
// @include http://chowtimes.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
//Comment out the following three lines to keep the top menu
AddStyle ("#slidedeck_frame skin-default {display:none !important;}");
AddStyle (".spine{display:none !important;}");
AddStyle ("#header{display:none !important;}");
AddStyle (".index{display:none !important;}");
AddStyle (".active slide slide_1{display:none !important;}");
