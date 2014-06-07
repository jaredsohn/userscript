// ==UserScript==
// @name           Reddit User RSS Link
// @namespace      http://userscripts.org/users/492428
// @description    Adds an RSS Button to a Reddit User Page
// @include        http://www.reddit.com/user/*
// @include        https://www.reddit.com/user/*
// @author         Doodles  
// @grant          none
// @version        1
// @grant          none
// ==/UserScript==

// vars
var rssText = " [RSS]";
var rssTitle = "Subscribe by RSS";
var rssPart1 = "http://www.reddit.com/user/";
var rssPart2 = "/submitted/.rss";

// code
var url = getUserNameProfile();
if(url != "//") 
{
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length;i++)
	{
		if(divs.item(i).getAttribute('class') == "titlebox")
		{
			var hs = divs.item(i).getElementsByTagName('h1');
			var linky = document.createElement('a');
			linky.setAttribute('href', url);
			linky.setAttribute('title', rssTitle);
			var t=document.createTextNode(rssText);
			linky.appendChild(t);
			hs.item(0).appendChild(linky);
			break;	
		}
	}
}
else
{
	// malformed url :(	
}

// methods
function getUserNameProfile() {
	var username = "";
	var title = document.URL;
	var stuff = title.split("/");
	for (var i = 0; i < stuff.length; i++) 
	{
		if(stuff[i] == "user") 
		{
			if(i + 1 < stuff.length) 
			{
				username = stuff[i + 1];
				if(username.indexOf("?") != -1)
				{
					var morestuff = username.split("?");
					username = morestuff[0];
				}
				return rssPart1 + username + rssPart2;
			}
			else
			{
				return "//";
			}
    	}
	}
	return "//";
}