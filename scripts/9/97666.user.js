// ==UserScript==
// @name           easy reader
// @namespace      http://userscripts.org/users/297509
// @description    Changes page colors when the background color is white for reading easily and saving electricity
// @include        http://*.*.*/*
// @include        http://*.*/*
// @version     6
// @grant       none
// ==/UserScript==

if(document.body.style.backgroundColor == ""
 || document.body.style.backgroundColor == "#FFF"
 || document.body.style.backgroundColor == "#fff"
 || document.body.style.backgroundColor == "#ffffff"
 || document.body.style.backgroundColor == "#FFFFFF")
{
	document.body.style.backgroundColor = "#ccc";
	document.body.style.color = "#000";
	document.body.style.fontFamily = "Arial";
	document.body.style.fontSize = "13";
}