// ==UserScript==
// @name        Blogger Template Editor Fullscreen (Google+ version)
// @namespace   http://userscripts.org/scripts/show/174289
// @include     http://www.blogger.com/blogger.g?*#templatehtml
// @include     https://www.blogger.com/blogger.g?*#templatehtml
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.0
// @grant       none
// ==/UserScript==

$(document).ready(function(){
  setTimeout(function() {
  document.getElementById("gb").style.display = "none"; // top1
  document.getElementsByClassName("GIL3GQOBA5")[0].style.display = "none"; //top2
  document.getElementsByClassName("GIL3GQOBI5")[0].style.display = "none"; //sidebar
  document.getElementsByClassName("GIL3GQOBG5")[0].style.top = 0;    var main = document.getElementsByClassName("GIL3GQOBOKB")[0];
  main.style.left = "5px";
  main.style.right = "5px";
  main.style.bottom = "5px";
  document.getElementsByClassName("GIL3GQOBELB")[0].style.left = "5px";
  }, 4000)

  setInterval(function() {
     document.getElementById("gb").style.display = "none"; // top1
//top2
  }, 1000)});