// ==UserScript==
// @name          The New York Fart
// @namespace     http://fap.li/nyf
// @description	  Replace the New York Times logo 
// @version 1.3
// @include       *nytimes.com/*
// ==/UserScript==


var stuff = document.createElement("object");

stuff.innerHTML = '<object width="1" height="1"><embed type="application/x-shockwave-flash" src="http://fap.li/nyf/pfft.swf" wmode="transparent" autoplay="true" height="1"width="1"></embed></object>';

var imgs = document.getElementsByTagName('img');

var ImageCounter = 0;

while (ImageCounter<imgs.length)
	{
	if (imgs[ImageCounter].src == 

"http://i1.nyt.com/images/misc/nytlogo379x64.gif")
		{
		imgs[ImageCounter].src = 

"http://img72.imageshack.us/img72/1691/nytlogo379x64.png";
		}
	else if (imgs[ImageCounter].src == 

"http://graphics8.nytimes.com/images/misc/nytlogo152x23.gif")
		{
		imgs[ImageCounter].src = 

"http://img72.imageshack.us/img72/7932/nytlogo153x23.png";
		}
	else if (imgs[ImageCounter].src == 

"http://graphics8.nytimes.com/images/misc/nytlogo153x23.gif")
		{
		imgs[ImageCounter].src = 

"http://img72.imageshack.us/img72/1052/nytlogo153x22.png";
		}
	else if (imgs[ImageCounter].src == 

"http://graphics8.nytimes.com/images/2010/09/16/opinion/Friedman_New/Friedman_New-articleInline.jpg")
		{
		document.body.insertBefore(stuff, document.body.firstChild);
		}
	ImageCounter++;
	};
	