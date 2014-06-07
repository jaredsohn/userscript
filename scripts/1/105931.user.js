// ==UserScript==
// @name Shooting_blanks
// @description Removes "" from html.
// ==/UserScript==
var a = document.getElementsByTagName("a");
for (i=0;i<a.length;i++)
  if (a[i].target=="_blank")
    a[i].target=""