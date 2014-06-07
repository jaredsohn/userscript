// ==UserScript==
// @name        BoxResize
// @namespace   http://userscripts.org/users/540889
// @include     *
// @version     1
// @grant       none
// ==/UserScript==
window.onload = document.getElementById("choiceContainer").onmouseover = function(){this.style.height = '300'};