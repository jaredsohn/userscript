// ==UserScript==
// @name Google Black NavBar Menu
// @namespace GBNM
// @description Restores the classic black bar menu replacing Google's app launcher. Allows you to keep your search terms starting from Google to YouTube.
// @version 12.13.13.0145
// @run-at  document-start
// @include http://www.google.*/search*
// @include https://www.google.*/search*
// @exclude http://www.google.*/search*&noj=1*
// @exclude https://www.google.*/search*&noj=1*
// @author drhouse
// ==/UserScript==

var theurl = document.URL;
window.location.href = (theurl + "&noj=1");