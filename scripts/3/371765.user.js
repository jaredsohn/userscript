// ==UserScript==
// @name       Open Steam Store page in Steam built-in browser
// @version    0.1
// @description  Adds a link to Steam Store to open this page in Steam built-in browser
// @include        http://store.steampowered.com/app/*
// @include        https://store.steampowered.com/app/*
// ==/UserScript==

// Used DougieDoodles's code ( http://userscripts.org/users/492428 )

// FIND RIGHT DIV
var found = false;
var achDiv;
var divs = document.getElementsByTagName('div');		
for(var i = 0; i < divs.length;i++)
{
	if(divs.item(i).getAttribute('class') == "apphub_OtherSiteInfo")
	{
		achDiv = divs.item(i);
		found = true;
		break;
	}
}
// IF DIV EXISTS
if(found)
{
	var appid = getAppID();
	if(appid != "//") 
	{
		// achievementstats.com
		var link1 = createLink("steam://store/" + appid, "Open this app page in Steam");
		achDiv.appendChild(link1);
	}
	else
	{
		// malformed store url :(	
	}
}

// </main>

// METHODS
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

function createLink(url, link_text) {
	// Create Anchor Element
	var link = document.createElement('a');
	link.setAttribute('class', 'btn_darkblue_white_innerfade btn_medium');
	link.setAttribute('href', url);
	// Create Div Element
	var innerDiv = document.createElement('span');
	// Assemble
	link.appendChild(innerDiv);
	innerDiv.appendChild(document.createTextNode(link_text));
	// Return Package
	return link;
}