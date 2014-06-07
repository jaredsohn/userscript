// ==UserScript==
// @name           Hide Rippy
// @namespace      http://what.cd
// @description    Hide Rippy
// @include        http*://*what.cd/*
// ==/UserScript==

var rip = document.getElementsByClassName("rippy")[0];

function gone() {
	var matter = document.getElementsByClassName("rippy")[0];
	matter.style.display = "none";
}
gone();
