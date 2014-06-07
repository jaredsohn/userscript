// ==UserScript==
// @name        Mawally Album Downloader
// @description Download the whole album
// @namespace   NB
// @include     http://www.mawaly.com/music/*
// @exclude     http://www.mawaly.com/music/*/track/*
// @exclude     http://www.mawaly.com/music/*/video/*
// @version     1.5
// @grant       none
// ==/UserScript==

var element_id = "playPauseButton";
var replacement_id = "JustTempChangeByMawallyAlbumDownloader";
var documentSource = document.body.innerHTML;
var l = "";
var links = "";
var count = count_ids();
var ads = disable_audio_ads();

for (var i = 0; i< count; i++)
{
	l = document.getElementById(element_id).getAttribute("url").toString();
	
	links += l.toString() + "\n";
	
	var div = document.createElement('div'); 
	div.innerHTML = "<a href=\"" + l + "\" target=\"_blank\"><img src=\"http://img801.imageshack.us/img801/566/downloadlx.png\" alt=\"Download Now\" width=\"20\" height=\"20\"></a>";
	div.setAttribute("style", "width:50px");
	div.setAttribute("id", "downloadBtn");
	document.getElementById(element_id).parentNode.appendChild(div);
	document.getElementById(element_id).setAttribute("id", replacement_id);
}

for (var i=0; i < count; i++)
{
	document.getElementById(replacement_id).setAttribute("id", element_id);
}

////

function count_ids()
{
	var divs = document.getElementsByTagName('span');
	var numTabs = 0;
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].id.indexOf(element_id) != -1)
			numTabs++;
	}
	
	return numTabs;
}

function disable_audio_ads()
{
	try
	{
		element = document.getElementById("vADsPlayer");
		element.parentNode.removeChild(element);
		
		$.cookie('player-play-through', -1000, {expires: 36500, path: '/', secure: false});	
		return true;
	}
	catch (err)
	{	
		return false;
	}
}