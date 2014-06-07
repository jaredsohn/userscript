// ==UserScript==
// @name           ncore disable fadein
// @namespace      http://ncore.hu/disable-fadein-box
// @description    disables the popups on ncore.hu
// @include        http://ncore.hu/*
// @include        http://ncore.us/*
// @include        http://ncore.cc/*
// ==/UserScript==

var a = document.getElementById('fadeinbox');
if(a) {a.style.display = 'none';}
