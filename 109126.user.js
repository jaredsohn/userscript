// ==UserScript==
// @name           Hide G+ Incoming Stream
// @author			Maria-Ines Carrera (http://mariain.es)
// @version        2011.08.04
// @description  Just hide the link for the incoming stream.
// @include        http*://plus.google.com/*
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

var css = ".a-c-mb-F5 { display:none; }";
addCss(css);