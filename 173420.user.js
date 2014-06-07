// ==UserScript==
// @name           Steam Community Hub to Store Redirect
// @namespace      http://userscripts.org/users/492428
// @description    Redirects from a Steam community hub to the appropriate Steam store page.
// @include        http://steamcommunity.com/app/*
// @include        https://steamcommunity.com/app/*
// @author         Doodles  
// @grant          none
// @version        1.0
// @run-at         document-start
// ==/UserScript==

// main code
var appid = getAppID();
if(appid != "//") 
{
	var storelink = "http://store.steampowered.com/app/" + appid;
	window.location = storelink;
}
else
{
	// malformed url :(	
}

// methods
function getAppID() {
	var appid = "";
	var title = document.URL;
	var stuff = title.split("/");
	for (var i = 0; i < stuff.length; i++) 
	{
		if(stuff[i] == "app") 
		{
			if(i + 1 < stuff.length) 
			{
				appid = stuff[i + 1];
				if(appid.indexOf("?") != -1)
				{
					var morestuff = appid.split("?");
					appid = morestuff[0];
				}
				return appid;
			}
			else
			{
				return "//";
			}
    	}
	}
	return "//";
}