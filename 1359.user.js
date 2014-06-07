// ==UserScript==// @name         deviantUNANNOY// @namespace    net.moeffju.dA// @description  Makes deviantART bearable for non-subscribers
// @include      http://*.deviantart.com/*
// ==/UserScript==

// ÃÂ© 2005 Matthias Bauer <http://moeffju.deviantart.com/>

var d = 100;
var f = function () {
  var x = document.getElementById('sponsors');
  if (x) x.parentNode.removeChild(x); else setTimeout(f,d);
}
setTimeout(f,d);
