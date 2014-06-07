// ==UserScript==
// @name           Fhu Forum Gyors Valasz
// @namespace      http://freeforum.n4.hu/feliratok/
// @description    Gyors valasz mezot a lap tetejere helyezi.
// @include        http://freeforum.n4.hu/feliratok/*
// ==/UserScript==
var b = document.getElementById('quickreplybox');
var d = document.getElementById('forumposts');
d.parentNode.insertBefore(b,d);
b.style.margin = "0 0 10px 0"
document.getElementById('display_jump_to').style.margin = "0.2em 1px 0";