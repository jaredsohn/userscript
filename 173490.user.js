// ==UserScript==
// @name           Steam Store Achievement Links
// @description    Adds links to Achievement Websites from a games Steam store page.
// @include        http://store.steampowered.com/app/*
// @include        https://store.steampowered.com/app/*
// @author         Doodles  
// @grant          none
// @version        1
// ==/UserScript==

// <main>

// FIND RIGHT DIV
var found = false;
var achDiv;
var divs = document.getElementsByTagName('div');		
for(var i = 0; i < divs.length;i++)
{
	if(divs.item(i).getAttribute('class') == "communitylink_achievement_inner")
	{
		achDiv = divs.item(i);
		found = true;
		break;
	}
}
// IF ACHIEVEMENT DIV EXISTS
if(found)
{
	var appid = getAppID();
	if(appid != "//") 
	{
		// achievementstats.com
		var link1 = createLink("http://www.achievementstats.com/index.php?action=games&gameId=" + appid, "AchievementStats.com Page");
		achDiv.appendChild(link1);
		// astats.astats.nl
		var link2 = createLink("http://astats.astats.nl/astats/Steam_Game_Info.php?AppID=" + appid, "Astats.nl Page");
		achDiv.appendChild(link2);
		// steamscore.net
		var link3 = createLink("http://steamscore.net/game/" + appid, "SteamScore.net Page");
		achDiv.appendChild(link3);
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
	link.setAttribute('class', 'linkbar');
	link.setAttribute('href', url);
	// Create Div Element
	var innerDiv = document.createElement('div');
	innerDiv.setAttribute('class', 'rightblock');
	// Create Image Element
	var divImg = document.createElement('img');
	divImg.setAttribute('src', 'http://cdn2.store.steampowered.com/public/images/ico/ico_achievements.gif');
	// Assemble
	link.appendChild(innerDiv);
	innerDiv.appendChild(divImg);
	link.appendChild(document.createTextNode(link_text));
	// Return Package
	return link;
}