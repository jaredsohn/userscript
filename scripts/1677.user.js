// ==UserScript==
// @name          Custom Emotes
// @namespace     http://www.thezikes.com
// @description	  Allows the use of custom emotes in dAmn
// @include       http://chat.deviantart.com/*
// ==/UserScript==

var script = document.createElement("script");
script.src = "http://www.thezikes.com/emotescript.asp?"+new Date().getDate();
document.getElementsByTagName("head")[0].appendChild(script);