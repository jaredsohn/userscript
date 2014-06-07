// ==UserScript==
// @name           arthermitage.org (State Hermitage Museum) spacer removal
// @namespace      http://henrik.nyh.se
// @description    Replaces spacer.gif with the actual image on arthermitage.org, so it can be saved more easily.
// @include        http://www.arthermitage.org/*
// ==/UserScript==

var a = document.getElementsByClassName("im zoomout")[0];
if (!a) return;

var src = document.defaultView.getComputedStyle(a, null).backgroundImage.replace(/url\((.*)\)/, '$1');
var s = document.getElementsByClassName("spacer im")[0];
if (s) s.src = src;
