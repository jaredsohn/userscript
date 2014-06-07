// ==UserScript==
// @name       Yahoo New Tab Error Fix For Chrome
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  An UserScript For Fix Yahoo New Tab Error.
// @match      https://tw.yahoo.com/
// @copyright  2014, RandKao
// @include http://tw.yahoo.com/*
// ==/UserScript==

//Add Listener After Page Load
window.addEventListener('load', function() {
  //Ver a Link
  var link;
  //Get Link From Page
  link = document.body.getElementsByTagName("a");
  //Run Loop For Replace Error Attribute
  for (var i = 0; i < link.length; i++) {
      //Replace "hp" Attribute From Page
      link[i].removeAttribute("hp");
  };
}, false);

