// ==UserScript==
// @name           Rotten Image replacer
// @namespace      http://userscripts.org/users/useridnumber
// @description    substitutes the stupid tomatoes for thumbs
// @include        http://www.rottentomatoes.com/*
// ==/UserScript==

var imgs = document.getElementsByTagName('img')

var ImageCounter = 0
while (ImageCounter<=imgs.length)
	{
 	if (imgs[ImageCounter].src == "http://images.rottentomatoes.com/images/tomato/rotten.gif")
		{ 
		imgs[ImageCounter].src = "http://www.thedrumclinic.com/images/thumbs-down.gif";
		}
	else if (imgs[ImageCounter].src =="http://images.rottentomatoes.com/images/tomato/fresh.gif")
		{
		imgs[ImageCounter].src = "http://www.thedrumclinic.com/images/thumbs-up.gif";
		}
	
	ImageCounter++;
	}
	

