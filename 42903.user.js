// 2009-02-22 sample code by otchy
// any use without permission is highly welcome

// ==UserScript==
// @name          logless mixi
// @description   will keep you away from clicking devil's button, aka mixi's "ASHIATO".
// @include       http://mixi.jp/*
// ==/UserScript==

(function () {

  var x = (document.getElementsByClassName("log")[0]);
  x.innerHTML="";

  var y = (document.getElementsByClassName("personalNaviHome")[0]);
  y.setAttribute('style','width:858px');

})();
