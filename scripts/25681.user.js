// ==UserScript==
// @name           The Hunger Site Autoclicker
// @namespace      http://localhost/
// @description    Clicks through all the hunger sites available causes
// @include        http://www.thehungersite.com/*
// ==/UserScript==

/*
Copyright Jonathan D
*/

var sites=new Array("The Hunger Site","The Breast Cancer Site","The Child Health Site","The Literacy Site","The Rainforest Site","The Animal Rescue Site");

function determineSite()
{
	for (var i=0;i<sites.length;i++)
	{
		if (document.title.indexOf(sites[i])!=-1)
		{
			//Return site number
			return i;
			break;
		}
	}
}

function determinePlace()
{
	if (document.title.indexOf("Click to Give")!=-1)
	{
		//We're on the page prompting us to click
		return 0;
	}
	else if (document.title.indexOf("Thank You For Clicking")!=-1)
	{
		//We're on the page after we've clicked
		return 1;
	}
	else
	{
		//We're someplace else altogether!
		return 2;
	}
}

function clickButton()
{
	for (var i=0;i<1000;i++)
	{
		//Searches for the button
		if(document.getElementById("_id"+i+":clickToGiveButton"))
		{
			//And if it's found, click it!
			document.getElementById("_id"+i+":clickToGiveButton").click();
			return true;
		}
	}
	return false;
}

function nextSite(site)
{
	if (document.getElementById("topNav").getElementsByTagName("a")[site+1].href)
	{
		location.href=document.getElementById("topNav").getElementsByTagName("a")[site+1].href;
		return true;
	}
	return false;
}

function init()
{
	switch (determinePlace())
	{
		case 0:
		if(!clickButton()) alert("Error!");
		break;
		case 1:
		if(!nextSite(determineSite())) alert("Error!");
		break;
		case 2:
		default:
		alert("Error!\nDebug Info:\nPlace:"+determinePlace()+"\nSite:"+determineSite());
		break;
	}
}

init() //Everythings defined so let's kick off the action!