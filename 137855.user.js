// ==UserScript==
// @name        Anti-SALVIA!
// @namespace   Diochan
// @description Elimina la scritta SALVIA! Per lurkare in un'atmosfera più rilassata.
// @include     http://diochan.com/*

// @include     http://www.diochan.com/*
// @version     v.1
// ==/UserScript==


var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace('<span class="sage">SALVIA!</span>' , '');
}

