// ==UserScript==
// @name          Fix Hacked Villavu
// @description	  Fixes Villavu
// @namespace     http://userscripts.org/users/117504
// @include       http://villavu.com/*
// ==/UserScript==
FixVillavu();
function FixVillavu() {
var body = document.getElementsByTagName('body')[0];
try { body.setAttribute("style", "-moz-transform: rotate(0deg);") }
catch(err) {}
}