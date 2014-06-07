// ==UserScript==
// @name           Google left bar fixed
// @namespace      ume
// @author         umeume85
// @include        *.google.*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#leftnav {background-color: #D3D3D3;}");
AddStyle("#leftnav {position:fixed !important;top:100px !important;}");