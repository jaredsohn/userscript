// ==UserScript==
// @name           PIN Msg Remover
// @author	   Endy
// @namespace      DeNada
// @description    Removes PIN warning message
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#error_msgs {display:none}");