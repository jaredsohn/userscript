// ==UserScript==
// @name	Facebook Ad Highlighter
// @namespace	happinessiseasy
// @include	http*://facebook.com/*
// @include	http*://*.facebook.com/*
// @description	Makes ads on Facebook easily distinguishable by highlighting them
// @version	1.0
// ==/UserScript==

window.addEventListener("load",
 function()
 {
  var body = document.getElementsByTagName('body')[0];
  if (body)
  {
   var style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = "";
   style.innerHTML += "div.home_sponsor {background-color:#FFFF77 !important;}\n";
   style.innerHTML += "div.sidebar_item.emu_sponsor {background-color:#FFFF77 !important;}\n";
   style.innerHTML += "div.sidebar_item.house_sponsor {background-color:#FFFF77 !important;}\n";
   body.appendChild(style);
  }
 },true);