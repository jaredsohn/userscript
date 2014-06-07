// ==UserScript==
// @name           SVZ Allow Image Rightclick
// @description    Erlaubt das Kontextmenü für Bilder im StudiVZ wieder, sodass diese auch gespeichert werden können.
// @include        http://www.studivz.net/Photos/*
// ==/UserScript==

var image = document.getElementById("PhotoContainer");
if (image != null)
	image.childNodes[0].setAttribute("oncontextmenu", "");