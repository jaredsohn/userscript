// ==UserScript==
// @name			Youtube - Preload suggestions
// @include			http://youtube.com/*
// @include			https://youtube.com/*
// @include			http://www.youtube.com/*
// @include			https://www.youtube.com/*
// @grant			none
// @website			http://userscripts.org/scripts/show/132751
// ==/UserScript==

function setimg(stream)
{
	img = stream.getElementsByTagName("img")[0];
	imgPath = img.getAttribute("data-thumb");
	if (imgPath != undefined) {
		img.setAttribute("src", imgPath);
	}
}

thumbs = document.querySelectorAll(".yt-thumb-clip, .yt-uix-simple-thumb-wrap");
var count = 0;
while (count < thumbs.length) {
	setimg(thumbs[count]);
	count++;
}
