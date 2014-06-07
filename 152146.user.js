// ==UserScript==
// @name           YouTube RSS Feed
// @description    a script to add an rss feed button to youtube videos
// @include        http://*.youtube.*/user/*
// @include        https://*.youtube.*/user/*
// @author         Doodles  
// @grant          none
// @version        1.5
// ==/UserScript==

// rss feed settings
var rssPart1 = "http://gdata.youtube.com/feeds/api/videos?max-results=50&alt=rss&orderby=published&author=";
var rssPart2 = "";
var rssText = "RSS Subscribe";
var rssToolTip = "Subscribe by RSS Feed";

// main code
var username = getUserNameProfile();
if(username != "//") 
{
	var button = createButton(username);
	var oldDesign = placeButtonOld(button);
	if(oldDesign != true)
	{
		oldDesign = placeButtonNew(button);
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
				return username;
			}
			else
			{
				return "//";
			}
    	}
	}
	return "//";
}

function createButton(username) {
	//
	var button = document.createElement('button');
	button.setAttribute('class', 'yt-subscription-button yt-subscription-button-js-default yt-uix-button yt-uix-button-subscribe-branded');
	button.setAttribute('data-tooltip-text', rssToolTip);
	button.setAttribute('onclick', "parent.location='" + rssPart1 + username + rssPart2 + "'");
	button.setAttribute('type', 'button');
	button.setAttribute('role', 'button');
	//
	var outerSpan = document.createElement('span');
	outerSpan.setAttribute('class', 'yt-uix-button-content');
	//
	var innerSpan = document.createElement('span');
	innerSpan.setAttribute('class', 'subscribe-hh-label');
	innerSpan.appendChild(document.createTextNode(rssText+' '));
	//
	button.appendChild(outerSpan);
	outerSpan.appendChild(innerSpan);
	//
	return button;
}

function placeButtonOld(button) {
	// old channel design
	var header = document.getElementById('channel-header-main');
	if(header != null)
	{
		var divs = header.getElementsByTagName('div');		
		for(var i = 0; i < divs.length;i++)
		{
			if(divs.item(i).getAttribute('class') == "upper-left-section")
			{
				divs.item(i).appendChild(button);
				return true;	
			}
		}
	}
	return false;
}

function placeButtonNew(button) {
	// new channel design
	var header = document.getElementById('c4-primary-header-contents');
	if(header != null)
	{
		var divs = header.getElementsByTagName('span');	
		for(var i = 0; i < divs.length;i++)
		{
			var cl = divs.item(i).getAttribute('class');
			if(cl.indexOf("channel-header-subscription-button-container") != -1)
			{
				divs.item(i).appendChild(button);
				return true;	
			}
		}
	}
	return false;
}