// ==UserScript==
// @name          Hide Facebook Ticker!
// @namespace     http://
// @description	  Hide that irritating "Ticker" in Facebook's sidebar
// @include       http*://facebook.com/*
// @include       http*://*.facebook.com/*
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
window.onload = function() {
  addCss('.fbFeedTicker {display:none!important;}');
  addCss('.pagelet_rhc_ticker {display:none!important;}');
};