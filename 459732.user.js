// ==UserScript==
// @name           Auto-Start Tubes
// @namespace      http://userscripts.org/users/645074
// @description	   Auto-Starts embedded video on some sites (currently all porn).
// @include        http://hellporno.com/videos/*
// @include        http://www.porntube.com/videos/*
// @include        http://www.pornerbros.com/*
// @include        http://www.jizzbell.com/videos/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==


$(document).ready (function()
{
	try
	{
		var domain = document.domain.replace('www.','').replace('.com','');
		if (domain == 'hellporno')
		{
			timeouts(1, function()
			{
				unsafeWindow.jsPlay();
			});
		}
		else if (domain == 'porntube')	// had to make a work around for this one, but it works
		{
			timeouts(4, function()
			{
				document.location = "javascript:player.sendEvent('PLAY', true);";
			});
		}
		else if (domain == 'pornerbros')
		{
			setTimeout(function()
			{
				unsafeWindow.jwplayer("player").play();
			}, 1000);
		}
		else if (domain == 'jizzbell')
		{
			setTimeout(function()
			{
				unsafeWindow.jwplayer().play();
			}, 1000);
		}
	}catch(e){}
});

function timeouts(times, func)
{
	var inc = 1000;
	for (i=inc; i<inc*(times+1); i+=inc)
	{
		setTimeout(func, i);
	}
}