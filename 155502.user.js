// ==UserScript==

// @name           MUK Notarkiv
// @namespace      Anton Jeppsson
// @include        http://muk.se/medlem/noter/.%5C*
// ==/UserScript==

var locObj = window.location.toString();
var str1 = "/.%5C";
var str2 = "%5C";
var newStr = "/";
locObj = locObj.replace(str1, newStr); 
locObj = locObj.replace(str2, newStr);
newLocation = locObj;

window.location.replace(newLocation);