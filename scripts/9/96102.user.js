// ==UserScript==
// @name           ungaygoogle
// @namespace      by_trustnoone
// @include        http://www.google.*
// @include        http://www.google.*/*
// @include        http://www.google.*.*/*
// ==/UserScript==
//



function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};


AddStyle("#cnt { margin-left: 0}")