// ==UserScript==
// @name          Shoutcast Autorefresh page - every 2 mins
// @namespace     http://shoutcast.com/*
// @description	  Automatically refreshes the shoutcast page
// @include       http://shoutcast.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us,  etc.)


function refreshForm()
{
	if (window.location == "http://shoutcast.com/")
	{
		timerCount = 0;
	}	
	if (!GM_getValue('shoutcastLanguage')) 
	{
		shoutcastLanguage = prompt("Please enter the search term that must be used to search...");
		GM_setValue('shoutcastLanguage', shoutcastLanguage);
	} 
	else 
	{
		shoutcastLanguage = GM_getValue('shoutcastLanguage');
	}
	
	if (timerCount <= 0)
	{
		document.getElementsByName('s')[0].value = shoutcastLanguage;
		document.forms[1].submit();
	}
	timerCount--;
	document.title = "Shoutcast Updating.. (" + timerCount + ")";
}

var timerCount = 120;
window.setInterval(refreshForm,1000);