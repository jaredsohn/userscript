// UT San Diego Hide Comments
// version 0.1
// Ben Katz
// 2013-10-13
// Released to the public domain.

// ==UserScript==
// @name          UT San Diego Hide Comments
// @namespace     http://www.utsandiego.com/~Comments
// @description   This script hides comments found on the UTSanDiego website
// @include       http://*.utsandiego.com/*
// ==/UserScript==
window.onload = function () {
	document.getElementById('comments-module').remove();
}