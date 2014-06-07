// ==UserScript==
// @name      White on Black Page                 
// @namespace      Gampol Thitinilnithi
// @include        http://*
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

addCss('a {color: #CE0 !important;text-decoration: none !important} body{background: #272822 !important} *{color:white; background-color:#272822 !important}')