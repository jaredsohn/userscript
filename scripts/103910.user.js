// ==UserScript==
// @name           PM - UnBlur seller shop
// @description    UnBlur js links
// @include        http://www.priceminister.com/*
// ==/UserScript==

var array = document.getElementsByClassName("pm_pseudo");
for(i = 0; i < array.length; i++) {
  var tab = array[i].href.split("'");
  array[i].href = "/" + tab[1] + "/" + tab[3];
} 
