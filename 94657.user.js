// ==UserScript==
// @name    		Gaia - Turn off autoplay on profiles
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description 	When viewing a Gaia user's profile, turns off media autoplay so that music or videos don't start unless you want them to.
// @include 		http://www.gaiaonline.com/profiles/*
// @require 		http://sizzlemctwizzle.com/updater.php?id=94657
// ==/UserScript==

/* Notes: Turns off autoplay for Youtube, Grooveshark, Playlist.com, Mixpod, and Flashwidgetz flash embeds.
Will add more as I encounter more types of media that autoplay. */

var vid;

var x;
var embeds = document.getElementsByTagName("embed");
for (x in embeds)
{
	vid = embeds[x].getAttribute("src");
	vid = noplay(vid);
	embeds[x].setAttribute("src",vid);
}

/* Gaia appears to have changed their profile object code, so this is for those cases */
var y;
var params = document.getElementsByTagName("param");
for (y in params)
{
	if(params[y].name == "movie")
	{
		var movie = params[y];
		vid = movie.value;
		vid = noplay(vid);
		movie.parentNode.setAttribute("data",vid);
		movie.value = vid;
	}
}

function noplay(vid)
{
	if (vid.indexOf("youtube") != -1) // YouTube
	{
		vid = vid.replace(/(\?|&)autoplay\=1/gi, "&");
	}
	else if (vid.indexOf("grooveshark") != -1) // Grooveshark
	{
		vid = vid.replace(/&p\=1(&|$)/gi, "&");
	}
	else if (vid.indexOf("playlist.com") != -1 || vid.indexOf("myplaylist.org") != -1 || vid.indexOf("profileplaylist.net") != -1 || vid.indexOf("greatprofilemusic.com") != -1 || vid.indexOf("playlistproject.net") != -1 || vid.indexOf("musiclist.us") != -1 || vid.indexOf("musicplaylist.us") != -1 || vid.indexOf("indimusic.us") != -1 )  // Project Playlist
	{
		if (vid.indexOf("noautostart") == -1)
		{
			if (vid.indexOf("shuffle") != -1)
			{
				vid = vid.replace("shuffle", "noautostart_shuffle");
			}
			else
			{
				vid = vid.replace(".xml", "_noautostart.xml");
			}
		}
	}
	else if (vid.indexOf("mixpod.com") != -1 || vid.indexOf("flashwidgetz.com") != -1) // Mixpod and Flashwidgetz
	{
		vid += "&autoplay=false";
	}
	return vid;
}