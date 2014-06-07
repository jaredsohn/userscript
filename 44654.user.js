// Twitter Searcherizer!
// Created by Matty McLean (www.mattymc.com)
// --------------------------------------------------------------------
//
// Use on search.twitter.com to keep the results refreshing.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TwitterSearcherizer
// @namespace     http://www.mattymc.com/
// @description   To make let the search go on!
// @include       http://search.twitter.com/*
// ==/UserScript==

window.doIt = function()
{
	var contentArea = document.getElementById('res-update');
	if (contentArea != null) //If null -- You are outdated scripty
	{
		contentArea.style.display = '';
		var watchArea = document.getElementById('new-res-count');
		if (watchArea == null)
			return;

		contentArea.innerHTML = '<span id="new-res-count">0</span> new results. Don\'t worry!! I will refesh when new results come. <a href="http://mattymc.com/2009/03/19/auto-refresh-the-twitter-search-pages/">Problems?</a>'	
		if (watchArea.innerHTML != '0')
		{
			window.location = window.location;	
		}
	}

	setTimeout(function(){window.doIt();}, 10 * 1000);
}

window.doIt();

