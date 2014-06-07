// ==UserScript==
// @name           Anti Dedeler
// @include        http://nobrain.dk/*
// @include        http://*.nobrain.dk/
// ==/UserScript==
window.location="http://www.google.com";
x = document.getElementsByTagName('html');
x[0].innerHTML = "cCc AntiDedeler cCc";
y = document.getElementsByTagName('script');
y[1].innerHTML = " ";
