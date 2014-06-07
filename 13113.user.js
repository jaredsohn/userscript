// ==UserScript==
// @name           Show Amazon Price
// @namespace      http://www.khan.org/
// @version        1.3
// @description    Avoids the stupid "click here to see the price" feature at spamazon
// @include        http://*.amazon.com/*
// ==/UserScript==
var m = document.getElementById("mappopdiv_2");
if ( m ) {
  m.style.display="block";
  m.style.visibility="visible";
}