// ==UserScript==
// @name           GLB background color change
// @namespace      Cronus6
// @description    Change background to black 
// @include        http://goallineblitz.com/game/*
// ==/UserScript==


var everything = document.getElementsByTagName("*");
var bgcolor = [];

for(var i=0; i<everything.length; i++) {
  bgcolor[i] = document.defaultView.getComputedStyle(everything[i], "").getPropertyValue("background-color");
  if(
    bgcolor[i] == "rgb(221, 227, 221)" ||
    bgcolor[i] == "rgb(202, 208, 202)"
  ) {
    everything[i].style.backgroundColor = "#000000";
  }

}

