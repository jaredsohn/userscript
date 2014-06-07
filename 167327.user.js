// ==UserScript==
// @name        Load All Youtube Thumbnail Images WITHOUT JavaScript
// @description With JavaScript disabled, Youtube only loads the first few thumbnails on each page. This script fixes that.
// @include     http*://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==

//It's not like bandwidth is the most expensive resource... oh wait-

//Ironic that I'm solving this with escelated JavaScript -- but at least it's MY JavaScript

var res = document.evaluate("//img[contains(@src, 'ytimg.com/yts/img/pixel')]", document, null, 7, null);

snapshotLen = res.snapshotLength;
for(i = 0; i < snapshotLen; ++i)
{
	currentImage = res.snapshotItem(i);
	if(currentImage.hasAttribute('data-thumb'))
	{
		newSrc = location.protocol + currentImage.getAttribute('data-thumb');
		currentImage.src = newSrc;
	}
}
