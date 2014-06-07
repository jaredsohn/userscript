// ==UserScript==
// @name           Darker colors
// @namespace      144542
// @description    easier on the eyes!
// @include        http://eve-survival.org/*
// ==/UserScript==


function addCss(cssCode) {
var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

addCss('a {color: #FFCC33 !important;text-decoration: none !important} *{color:#999966 !important; background-color:#272822 !important}')