// ==UserScript==
// @author         madpit
// @name           imageshack.us auto show image
// @include        http://imageshack.us/photo/*
// ==/UserScript==


var prop = document.getElementsByTagName("link")[0].attributes.getNamedItem("rel").value;
var address = document.getElementsByTagName("link")[0].attributes.getNamedItem("href").value;

if (prop == "image_src")
	setTimeout("window.location='"+address+"'", 3);