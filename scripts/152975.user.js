// ==UserScript==
// @name           TheBotNet Seasonial Logo
// @namespace      TBNLogoChanger
// @description    Changes the TheBotNet logo into a seasional one.
// @include        *thebotnet.com*
// ==/UserScript==

var logoClass = document.getElementsByClassName("logo");
var img = logoClass = document.querySelector("img");
img.src = "http://i.imgur.com/qUrRe.png";