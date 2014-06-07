// ==UserScript==
// @name           fix wiki.blender.org
// @namespace      http://twoday.tuwien.ac.at/pub/
// @description    fixes the footer on wiki.blender.org
// @include        http://wiki.blender.org/*
// ==/UserScript==

var gw = document.getElementById("globalWrapper");
var f  = document.getElementById("footer");

function fix(el) {
	gw.removeChild(el);
	gw.parentNode.appendChild(el);
}

if (f.parentNode == gw) {
	fix(f);
	fix(document.getElementById("bottom"));
}