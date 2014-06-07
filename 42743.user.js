// ==UserScript==
// @name           Anti-Stretch
// @namespace      gsom
// @include        http://leprosorium.ru/*
// ==/UserScript==

var images = document.images;
var img;
for (var i = 0; i < images.length; ++i)
{
	img = images[i];
        img.removeAttribute('width');
        img.removeAttribute('height');
}