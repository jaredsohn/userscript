// ==UserScript==
// @name           Lynda MOV Downloader
// @namespace      http://www.nohomepageyet.de
// @description    Downloads MOV files from Lynda.com
// @include        http://movielibrary.lynda.com/html/player/*
// ==/UserScript==

GM_registerMenuCommand('Download MOV file', downloadLyndaMovie);

function downloadLyndaMovie()
{
	var movieObject = document.getElementById('xFiles');
	var moviePath = '';
	
	for(var i=0; i<movieObject.childNodes.length; i++)
	{
		if(movieObject.childNodes[i].name == "src")
		{
			moviePath = movieObject.childNodes[i].value;
			break;
		}
	}

	window.open(moviePath);
}