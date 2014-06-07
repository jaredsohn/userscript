// ==UserScript==
// @name           Last.fm Recent Tracks Updater
// @namespace      pendevin
// @description    Updates recently played track lists every minute without having to reload the page
// @include        http://www.last.fm/user/*
// ==/UserScript==

var tracksTable=document.getElementById("deletablert");
var profileTable=document.getElementsByTagName("table");
for (i=0;i<profileTable.length;i++)
{
	if (profileTable[i].id=="recentTracks")
	{
		profileTable=profileTable[i];
		break;
	}
}
var minute;
var xmlHttp;

//change the 60 in the next line to however many seconds you want to wait between updates
var timer=60*1000;

function ajax()
{
	xmlHttp=new XMLHttpRequest;
	xmlHttp.overrideMimeType("text/xml");
	xmlHttp.open("GET",window.location.href,true);
	if (tracksTable)
	{
		xmlHttp.onreadystatechange=tracksPage;
	}
	else if (profileTable)
	{
	
		xmlHttp.onreadystatechange=profilePage;
	}
	xmlHttp.send(null);
}

function tracksPage()
{
	if (xmlHttp.readyState==4)
	{
		var newText=xmlHttp.responseText;
		newText=newText.substring(newText.indexOf('id="deletablert"')-50);
		newText=newText.substring(newText.indexOf('<table '),newText.indexOf('<div class="pagination">'));
		tracksTable.innerHTML=newText;
		minute=setTimeout(ajax,timer);
	}
}

function profilePage()
{
	if (xmlHttp.readyState==4)
	{
		var newText=xmlHttp.responseText;
		newText=newText.substring(newText.indexOf('id="recentTracks"')-50,newText.indexOf('<span class="moduleOptions">'));
		newText=newText.substring(newText.indexOf("<table "),newText.indexOf('</table>')+8);
		profileTable.innerHTML=newText;
		console.log("hello");
		minute=setTimeout(ajax,timer);
	}
}

minute=setTimeout(ajax,timer);