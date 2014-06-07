// ==UserScript==

// @name          JokerWorld

// @namespace     http://www.webmonkey.com

// @description   The best font ever

// @include       *

// ==/UserScript==



var elements = document.querySelectorAll("*");
for(var i = 0; i<elements.length; i++) {
  elements[i].style.cssText += ";font-family: jokerman !important";
}
