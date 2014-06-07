// ==UserScript==
// @name gmin
// @description a simple script to make google.com (even more) ideal for being a homepage. I'm just using this for myself, so do whatever you wish with it.
// @include https://google.com.sg
// ==/UserScript==

var shab = [document.getElementById("als"),document.getElementById("footer"),document.getElementById("gbi4t"),document.getElementById("gbqfba"),document.getElementById("gbqfbb")];
for (ya in shab) { shab[ya].style.display="none";}