// ==UserScript==
// @name           Gmail eb3 Skin
// @namespace      http://userscripts.org
// @description    The only change is the font face: Franklin Gothic Medium
// @author         everblue3@gmail.com
// @homepage       http://userscripts.org
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); * { font-family: Franklin Gothic Medium !important }";

if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.innerHTML = css;
      heads[0].appendChild(node);
   }
}