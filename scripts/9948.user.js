// ==UserScript==
// @name           GoogleFaces
// @namespace      com.geekmatters.google
// @description    Add's a button to switch to Google's Face Search
// @include        http://images.google.com/*
// ==/UserScript==

var frms = document.getElementsByName("btnG");
var i;
for (i = 0; i < frms.length; i++)
{
  var check = document.createElement("input");
  check.type = "checkbox";
  check.name = "imgtype";
  check.value = "face";
  check.style.position = "relative";
  check.style.zOrder = "1000";
  frms[i].parentNode.appendChild(document.createTextNode("Faces Only:"));
  frms[i].parentNode.appendChild(check);
}