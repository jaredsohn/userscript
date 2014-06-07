// ==UserScript==
// @name           muxtape downloader 2
// @namespace      muxtapedownloader2
// @description    This downloads muxtape songs
// @include        http://*.muxtape.com/*
// ==/UserScript==

var black;
var songs = new Array();
for(var b in unsafeWindow)
{
	try
	{
		if(unsafeWindow[b].hexes != undefined)
		{
			if(unsafeWindow[b].hexes.length > 1)
			{
				black = unsafeWindow[b];
				for(var j=0; j<black.hexes.length; j++)
				{
					songs[j] = black.ladles['player'+black.hexes[j]].songurl;
				}
				break;
			}
		}
	}
	catch(e)
	{
	}
}

var lis = document.getElementsByTagName('li');
var j=0;
for(var i=0; i<lis.length; i++)
{
	if(lis[i].getAttribute("class") == "song")
	{
		// Location of PHP download script
		var dl_script = '';
		var dl_a = document.createElement('a');
		dl_a.setAttribute('href',dl_script+'?name=' + lis[i].childNodes[1].innerHTML + '&link=' + songs[j]);
		j++;
		dl_a.setAttribute('style',"color: #306EFF; display: inline;");
		dl_a.innerHTML="Download me!";
		lis[i].appendChild(dl_a);
	}
}