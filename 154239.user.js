// ==UserScript==
// @name        Youtube why
// @namespace   JeremyGeels
// @description Fixes the WHITE SPACE.
// @include     *.youtube.com*
// @version     1
// @grant		none
// ==/UserScript==

document.getElementById("logo-container").setAttribute("href","/feed/subscriptions/u");

document.getElementsByTagName("body")[0].setAttribute("class"," ");
document.getElementById("page-container").setAttribute("style","margin-left:500px");

try{document.getElementById("player-api").setAttribute("style", "overflow: hidden; margin-top:75px;");}catch(err){}

try{
var g = document.getElementById("guide");
g.parentNode.removeChild(g);
}catch(err){}