// ==UserScript==
// @name        Remove OnUnload Test
// @namespace   remove_onunload_test
// @include     http://www.thetaoofbadass.com/*
// @version     0.02
// @grant		none
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function(){
  setTimeout(function(){
    var w = window;
    w.onunload = null;
    w.onbeforeunload = null;
  //console.log(w);
  },1000);
});