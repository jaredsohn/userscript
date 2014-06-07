// ==UserScript==
// @name        dict.leo.org Layout-Aufräumer
// @namespace   RAdlo
// @description Räumt das 2013er-Layout von dict.leo.org auf. (Benötigt Werbeblocker. Z.B. AdBlock Plus.)
// @include     http://dict.leo.org/*
// @exclude     http://dict.leo.org/pages/*
// @exclude     http://dict.leo.org/forum/*
// @exclude     http://dict.leo.org/trainer/*
// @exclude     http://dict.leo.org/guestbook/*
// @include     https://dict.leo.org/*
// @exclude     https://dict.leo.org/pages/*
// @exclude     https://dict.leo.org/forum/*
// @exclude     https://dict.leo.org/trainer/*
// @exclude     https://dict.leo.org/guestbook/*
// @version     2013
// ==/UserScript==

function RAdlo() {
  
  document.getElementById("moreDictionaries").style.visibility = "hidden"
  
  var s = document.getElementById("topBranding").style
  s.width = "300px"
  s.marginBottom = "-90px"
  s = document.getElementById("searchBar").style
  s.left = "300px"
  s.maxWidth = "876px"
  s = document.getElementById("searchBoxContainerLeft").style.left = "0"
  s = document.getElementById("searchBoxContainerCenter").style.left = "246px"
  s = document.getElementById("searchBoxContainerRight").style.left = "778px"
  
  
  var e = document.getElementById("leftColumn")
  e.parentNode.removeChild(e)
  e = document.getElementById("rightColumn")
  e.parentNode.removeChild(e)
  s = document.getElementById("centerColumn").style
  s.top = "auto"
  s.left = "auto"
  s.right = "auto"
  
}

window.addEventListener("load",RAdlo)