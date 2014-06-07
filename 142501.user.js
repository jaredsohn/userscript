// ==UserScript==
// @name        Amazon Focus on Search
// @namespace   http://ssvx.de/
// @description Just place that blinky focus thingy in the search field already!
// @include     http://amazon.*/
// @include     https://amazon.*/
// @include     http://*.amazon.*/
// @include     https://*.amazon.*/
// @version     1
// ==/UserScript==
document.getElementById('twotabsearchtextbox').focus();