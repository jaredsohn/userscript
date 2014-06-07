// ==UserScript==
// @name           Hemlock
// @author	   Endy
// @namespace      DeNada
// @description    Rmv's eRep Ads
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#eads {display:none}");
