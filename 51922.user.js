// ==UserScript==
// @name           Hemlock
// @author	   Endy
// @namespace      DeNada
// @description    Kills Plato
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#advisor {display:none}");

