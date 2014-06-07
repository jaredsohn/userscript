// ==UserScript==
// @name           Free Blip FM
// @namespace      http://mightyprincipessa.blogspot.com/
// @description    Hide youtube player on blip.fm Version 0.1
// @include        http://blip.fm/*
// ==/UserScript==

function hideMediaBox(){
	var mediaBox;
	mediaBox = document.getElementById("mediaBox");
	document.getElementById("mediaBox").style.visibility="hidden";
	document.getElementById("mediaBox").style.maxHeight="0px";
}

window.addEventListener('load', hideMediaBox, true);