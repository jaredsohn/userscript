// ==UserScript==
// @name            imgFitToWindow
// @namespace       imgFitToWindow
// @description     Sho images fit to window
// @include         http://*.jpg
// ==/UserScript==
alert("in use");
document.getElementsByTagName("body")[0].onload = function(e) {
  document.getElementsByTagName("body")[0].style.textAlign = "center";
  document.getElementsByTagName("body")[0].style.backgroundColor = "#666666";
  document.getElementsByTagName("body")[0].style.margin = "0";
  document.getElementsByTagName("img")[0].style.height = "100%";
}