// ==UserScript==
// @name           Hide Rippy's textbox
// @namespace      http://what.cd
// @description    Hide Rippy's textbox
// @include        http*://*what.cd/*
// ==/UserScript==

var rip = document.getElementsByClassName("rippy")[0];

function gone() {
	var matter = document.getElementsByClassName("rippy")[0];
	matter.innerHTML = "";
}
gone();