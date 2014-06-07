// ==UserScript==
// @name        Nite
// @namespace   *
// @description MAKE ALL THE THING BLACK
// @include     http://*.*/*
// @version     1
// @grant       none
// ==/UserScript==
var allDivs, thisDiv;
var divs = document.getElementsByTagName("*");
var visibleDivs = [];
for(var i = 0; i < divs.length; i++) {
  var div = divs[i];
  var vis = div.style.visibility;
  div.style.background = "#000000";
  div.style.color = "#00aa88";
  div.style.borderColor = "#004466";
}