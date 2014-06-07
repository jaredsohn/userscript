// Written by gatsby for forum.exp0sed.com



// ==UserScript==

// @name Rapidshare.de

// @description Skip rapidshare.de counter

// @include http://rapidshare.de*

// ==/UserScript==



(function() {

 window.setTimeout = newSetTimeout;

 function newSetTimeout(func, interval) {

  var fCall = new Function(func);

  fCall();

 };

})();