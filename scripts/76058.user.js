// ==UserScript==
// @name           Google - Remove left bar
// @namespace      FB
// @author         Frank Bertelsen
// @include        *.google.*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#leftnav {display:none}");
AddStyle("#center_col {margin-left:0}");

