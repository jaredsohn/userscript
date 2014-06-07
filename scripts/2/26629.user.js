// JavaScript Document
// ==UserScript==
// @name           Warrock.it Forum Skin Changer
// @autor          xlubux © Warrock.it Staffer
// @email          xlubux@hotmail.it
// @namespace      Forum Warrock.it
// @description    Cambio Skin per Warrock.it Forum
// @include        http://*.warrock.*/*
// @exclude       
// ==/UserScript==

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
	for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

var img = $x("//img[contains(@src, 'http://www.warrock.it/forum/style_images/22_8fb0l15.png')]");
if (img.length) img[0].src = "http://forum.warrock.net/style_images/derbaran/main_bkgrd.gif";