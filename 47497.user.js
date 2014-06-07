// ==UserScript==
// @name           FFFFFF to 000000
// @namespace      http://pile0nades.wordpress.com/
// @description    Change white background to Black on web pages
// @include        *
// ==/UserScript==


var everything = document.getElementsByTagName("*");
var bgcolor = [];
for(var i=0; i<everything.length; i++) {
  bgcolor[i] = document.defaultView.getComputedStyle(everything[i], "").getPropertyValue("background-color");
  if(
    bgcolor[i] == "rgb(255, 255, 255)" ||
    bgcolor[i] == "rgb(254, 254, 254)"
  ) {
    everything[i].style.backgroundColor = "#000000";

  }
}

var fgcolor = [];
for(var i=0; i<everything.length; i++) {
  fgcolor[i] = document.defaultView.getComputedStyle(everything[i], "").getPropertyValue("color");
  if(
    fgcolor[i] == "rgb(255, 255, 255)" ||
    fgcolor[i] == "rgb(254, 254, 254)"
  ) {
    everything[i].style.Color = "#FFFF00";
  }
}