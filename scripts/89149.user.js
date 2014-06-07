// ==UserScript==
// @name          GoogleImage
// @description   Replace image
// @include       http://www.google.com/*
// @include       http://www.google.co.in/*
// ==/UserScript==
//
// By: harry
//
// Partly based on "Googlenlarge" (http://userscripts.org/scripts/show/7863)
// and partly on "Google Image Relinker with Mouseover"
// (http://userscripts.org/scripts/show/9524).
var x = document.getElementsById("logo");
Var v = x.getAttribute("style");
v = "background: C:\Users\joker\Pictures\rajni.png no-repeat;height:110px;width:276px";
x.setAttribute("style", v);	


