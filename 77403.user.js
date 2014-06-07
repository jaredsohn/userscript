// ==UserScript==
// @name           SIDEBAR
// @namespace      SIDE
// @include http://*.google.*/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#leftnav {display:none; width: 0px;}");
AddStyle("#center_col, #foot {margin-left:0px !important; margin-right: 0px !important;}");
