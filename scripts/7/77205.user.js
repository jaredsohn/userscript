// ==UserScript==
// @name        8comic Enhancer
// @namespace   En8comic
// @description 
// @include     http://www.35xa.com/baby/*
// @version     0.0.1
// ==/UserScript==

var onloadFunction = function() {

document.getElementById("TheImg").onclick = function { jumpnext();return false };
}

document.addEventListener("load", onloadFunction, true);