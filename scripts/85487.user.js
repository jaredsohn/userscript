// ==UserScript==
// @name           Hide Rippy when clicked on
// @namespace      http://what.cd
// @description    Hide Rippy when clicked on
// @include        http*://*what.cd/*
// ==/UserScript==

var rip = document.getElementsByClassName("rippy")[0];

function gone() {
	var matter = document.getElementsByClassName("rippy")[0];
	matter.style.display = "none";
}
rip.addEventListener("click",gone,true);
