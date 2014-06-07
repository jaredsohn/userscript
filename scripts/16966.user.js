// ==UserScript==
// @name           SBS Schedule Expander
// @namespace      stuart.com
// @include        http://*.sbs.com.au/whatson/*
// ==/UserScript==

var tds = document.getElementsByTagName("TD");
for (var i = 0; i < tds.length; i++) {
 if (tds[i].className = "programlist") {
  var divs = tds[i].getElementsByTagName("DIV");
  for (var j = 0; j < divs.length; j++) {
   var div = divs[j];
   if (div.style.cssText == "display: none;") {
     div.style.cssText = "display: block;";
   }
  }
 }
}