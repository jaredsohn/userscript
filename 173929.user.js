// ==UserScript==
// @name        Blogger Template Editor Fullscreen
// @namespace   http://userscripts.org/scripts/show/173929
// @include     http://www.blogger.com/blogger.g?*#templatehtml
// @include     https://www.blogger.com/blogger.g?*#templatehtml
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.0
// @grant       none
// ==/UserScript==

$(document).ready(function(){
   setTimeout(function() {
   document.getElementsByClassName("GIL3GQOBL5")[0].style.display = "none";
   document.getElementsByClassName("GIL3GQOBA5")[0].style.display = "none";
   document.getElementsByClassName("GIL3GQOBN5")[0].style.top = 0;
   document.getElementsByClassName("GIL3GQOBG5")[0].style.top = 0;
   var main = document.getElementsByClassName("GIL3GQOBOKB")[0];
   main.style.left = 0;
   main.style.right = 0;
   main.style.bottom = 0;
   }, 2000)
   setTimer(function() {
       document.getElementsByClassName("GIL3GQOBN5")[0].style.top = 0;
   }, 1000)
});
