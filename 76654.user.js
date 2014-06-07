// ==UserScript==
// @name           FFFFFF to CCE8CF
// @namespace      
// @description    Change white background to #CCE8CF
//   (Hue(色调)设为85，Sat(饱和度)设为90，Lum(亮度)设为205) on web pages
// @include        *
// ==/UserScript==


var everything = document.getElementsByTagName("*");
var bgcolor = [];

for (var i = 0; i < everything.length; i++) {
  bgcolor[i] = window.getComputedStyle(everything[i], null).getPropertyValue("background-color");
  if ( bgcolor[i] == "rgb(255, 255, 255)" || bgcolor[i] == "rgb(254, 254, 254)" ) {
    everything[i].style.backgroundColor = "#CCE8CF";
  }
}
