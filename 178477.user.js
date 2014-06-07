// ==UserScript==

// @name          CHVRCHES

// @namespace     http://www.webmonkey.com

// @description   CHVRCHΞS is taking over the language

// @include       *

// ==/UserScript==



var elements = document.querySelectorAll("*");
for(var i = 0; i<elements.length; i++) {
  elements[i].style.cssText += ";font-family: CHVRCHS !important";
}
