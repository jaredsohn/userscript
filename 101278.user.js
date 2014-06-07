// ==UserScript==
// @name           Youtube Video Proxy
// @namespace      download
// @description    Redirects you to a proxy so you can watch Youtube videos that are blocked in your country.
// @include        *www.youtube.com/*
// ==/UserScript==

function unblock()
{
	var html = document.body.innerHTML;
	var regex = /watch-player-unavailable-message-container/gi;
	
	if (html.match(regex) != null) 
	{
		var url = 'http://www.youtubeunblocker.co.uk/go.php?a='+document.URL+'&b=0&f=norefer';
		window.location = url;
	}
}

document.onload = unblock();