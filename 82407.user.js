// ==UserScript==
// @name bladeforum
// @include http://www.bladeforums.com/forums/*

// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
//sidebar
AddStyle (".tcat{display:none !important;}");
AddStyle (".tfoot{display:none !important;}");
AddStyle ("#header_right_cell{display:none !important;}");
AddStyle (".vbmenu_control{display:none !important;}");
AddStyle (".vbmenu_popup{display:none !important;}");
AddStyle ("#pagenav_menu{display:none !important;}");