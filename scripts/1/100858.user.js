// ==UserScript==
// @name			Disable Youtube Autoplay
// @author			Johnny Lim
// @namespace		userscripts.org
// @version			1.2
// @description		Disable Auto-Play feature of Youtube videos, works on normal video page and user profile page.
// @include			http://youtube.com/watch*
// @include			http://*.youtube.com/watch*
// @include			http://youtube.com/user/*
// @include			http://*.youtube.com/user/*
// @include			https://youtube.com/watch*
// @include			https://*.youtube.com/watch*
// @include			https://youtube.com/user/*
// @include			https://*.youtube.com/user/*
// ==/UserScript==

var youtubeMoviePlayer = document.getElementById('movie_player');
var youtubeMoviePlayerVars = (youtubeMoviePlayer != null) ? youtubeMoviePlayer.getAttribute("flashvars") : '';

//in video page
if(window.document.location.toString().match(/http(s)?\:\/\/(.*)?youtube.com\/watch(.*)?/i))
{
	if(youtubeMoviePlayerVars)
	{
		youtubeMoviePlayer.setAttribute("flashvars", "autoplay=0&" + youtubeMoviePlayerVars);
		youtubeMoviePlayer.src += "#";
	}
	else 
	{
		window.onload = function()
		{
			var videoTag = document.getElementsByTagName('video')[0];
			if (videoTag) {
				videoTag.pause();
				videoTag.currentTime = 0;
			}
		};
	}
}
//in user profile page
else
{
	if(youtubeMoviePlayerVars)
	{
		youtubeMoviePlayer.setAttribute("flashvars", youtubeMoviePlayerVars.replace(/autoplay=1/i, "autoplay=0"));
		youtubeMoviePlayer.src += "#";
	}
	else
	{
		window.onload = function()
		{
			var videoTag = document.getElementsByTagName('video')[0];
			if (videoTag) {
				videoTag.pause();
				videoTag.currentTime = 0;
			}
		};
	}
}