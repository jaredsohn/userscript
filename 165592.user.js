// ==UserScript==
// @name        Remove Chrome spam on google.com
// @namespace   chsp
// @description Remove Install Chrome spam on 
// @include     https://www.google.*
// @include     http://www.google.*
// @version     1
// @grant       none
// ==/UserScript==

element = document.getElementById("prt");
if (element) {
  element.parentNode.removeChild(element);
}