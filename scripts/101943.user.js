// ==UserScript==
// @name          forum.eve-ru.com fixed width
// @author	  Slotos
// @description	  Stare at me, Bro!
// @include	  http://forum.eve-ru.com/*
// ==/UserScript==

window.onload = function (){
  document.body.style.text_align = "center";
  var t = document.getElementById('ipbwrapper');
  t.style.margin = "0 auto";
  t.style.width = "1000px";
};