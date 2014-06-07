// ==UserScript==
// @name           4chan mouseover to see image
// @namespace      4chan mouseover to see image
// @description    Images are transparent, mouseover to see it clearly.
// @include        http://*.4chan.org/*
// ==/UserScript==

const OPACITY_VALUE = 0.065; //min is 0 , max is 1

var links, div;

img = document.getElementsByTagName('img');
if(!img) return;

for(var i=0; i<img.length; i++)
{
	img[i].style.opacity = OPACITY_VALUE;
	img[i].addEventListener('mouseover', show, false);
	img[i].addEventListener('mouseout', hide, false);
}

function show(evt)
{
	evt.target.style.opacity = 1;
}

function hide(evt)
{
	evt.target.style.opacity = OPACITY_VALUE;
}


