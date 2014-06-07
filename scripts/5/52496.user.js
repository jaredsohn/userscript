// ==UserScript==
// @name           Facebook Ads Killer
// @description    Makes the ads go away.
// @include        http://www.facebook.com/*
// ==/UserScript==


function hideAds()
{
	if(document.getElementById('home_sponsor_nile'))
	{
		document.getElementById('home_sponsor_nile').style.visibility = 'hidden';
	}
	if(document.getElementById('sidebar_ads'))
	{
		document.getElementById('sidebar_ads').style.visibility = 'hidden';
	}
	
}
window.setInterval(hideAds, 1000);