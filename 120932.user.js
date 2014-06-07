// ==UserScript==
// @name OC.net
// @include http://overclock.net/*
// @include http://www.overclock.net/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle ("#sidebar{display:none !important;}");
AddStyle ("#main-container{min-width: 662px; !important;}");
AddStyle ("#footer{display:none !important;}");