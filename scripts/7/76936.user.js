// ==UserScript==
// @name           Swap alt and title text
// @description    Swaps alt and title text on click
// @include        http://*
// ==/UserScript==

function doshit() {
var images = document.images;
var img;
var temp;
for (var i = 0; i < images.length; ++i)
{
	img = images[i];
temp = img.title;
	img.title = img.alt;
	img.alt = temp;
}
}

document.onclick=doshit;