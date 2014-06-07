// ==UserScript==
// @name		Guardian Today Calendar
// @description	Fixes calendar day links when browsing the 'All Guardian Stories' news page, so that the urls reference 'all stories'
// @author		Shane 22
// @namespace	shane.22.guardian
// @include		http://www.guardian.co.uk/theguardian/*
// @include		http://www.guardian.co.uk/theobserver/*
// ==/UserScript==


// Url pattern when viewing 'all stories' : http://www.guardian.co.uk/theguardian/2010/jun/11/all

var urlPattern = "^http://www.guardian.co.uk/the(guardian|observer)/201[0-9]{1}/[A-Za-z]{3}/[0-9]{2}";

// Check to see if we're currently on an 'All Stories' page
var currentUrl = window.location.href;

var regex = new RegExp(urlPattern + "/all$");

if (regex.test(currentUrl))
{
	// Get the calendar
	var calendar = document.getElementById("calendar");

	if (calendar != null)
	{
		// Get the links
		var links = calendar.getElementsByTagName("a");
		
		if (links != null && links.length > 0)
		{
			regex = new RegExp(urlPattern + "$");
			for (var index = 0; index < links.length; index++)
			{
				var link = links[index];
				if (regex.test(link.href))
				{
					link.href = link.href + "/all";
				}
			}
		}
	}
}

