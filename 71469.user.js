// ==UserScript==
// @author         crea7or 
// @version        1.01
// @name           Habrahabr Show All Comments
// @namespace      habrahabr
// @description    Shows all comments at habrahabr.ru, so you don't waste time expanding them.
// @url            http://habrahabr.ru/blogs/google_chrome/87490/
// @include http://habrahabr.ru/blogs/*
// @include http://habrahabr.ru/blog/*
// @include http://habrahabr.ru/company/*
// @include http://*.habrahabr.ru/blogs/*
// @include http://*.habrahabr.ru/blog/*
// @include http://*.habrahabr.ru/company/* 
// ==/UserScript==


var oAllPs = document.querySelectorAll('div.entry-content-only');
if (oAllPs) 
{
	for (idx = 0; idx < oAllPs.length; idx++) 
	{
		if (oAllPs[idx].hasChildNodes()) 
		{
			divattr = oAllPs[idx].getElementsByTagName('div');
			for (idd = 0; idd < divattr.length; idd++) 
			{
				divattr[idd].removeAttribute("class");
			}

			aattr = oAllPs[idx].getElementsByTagName('a')
			for (ida = 0; ida < aattr.length; ida++) 
			{
				if ( aattr[ida].getAttribute("href") == "#" )
				{
					aattr[ida].setAttribute("class", "hidden");
				}
			}
		}
	}
}
