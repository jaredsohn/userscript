// ==UserScript==
// @name           Remove Img Title, Alt text
// @description    Remove Img Title and Alt text
// @include        http://*
// ==/UserScript==

/* Remove the alt and title text (useful when disabling images)

var images = document.images;
var img;
for (var i = 0; i < images.length; ++i)
{
	img = images[i];
	img.title = "";
	img.alt = "";
}