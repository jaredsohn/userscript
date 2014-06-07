// ==UserScript==
// Script von Pyramix @ kwick
// Würde mich über einen Gästebucheintrag und Unterstützung freuen!
// @name           Kwick
// @namespace      -
// @include        http://www.kwick.de/*
// ==/UserScript==
images = document.getElementById("pic");
imagesrc = images.src;
imagesrc = imagesrc.substr(0, 49);
imagesrc = imagesrc + "640x640.jpg";
images.src = imagesrc;