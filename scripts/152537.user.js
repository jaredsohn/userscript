// ==UserScript==
// @name           YouTube Auto HD + Resizer
// @namespace      modern.elementfx.com
// @include        *.youtube.com/watch?*
// ==/UserScript==


// settings - use a 16:9 resolution
var customSize = true;
var width = 660;
var height = 5;

var customQuality = true;
var quality = "1080" // ["240", "360", "480", "720", "1080"]

// script
if (customQuality)
{
	var qualitySwap = {"240":"small", "360":"medium", "480":"large", "720":"hd720", "1080":"hd1080"};

 	var head = document.getElementsByTagName('head')[0];

	// var text = "<script>onYouTubePlayerReady = function (playerId) { location.href = 'javascript:void((function () { document.getElementById(\"movie_player\").setPlaybackQuality(\"'" + qualitySwap[quality] + "'\") })());'; };</script>";
	var text = "onYouTubePlayerReady = function (playerId) { location.href = 'javascript:void((function () { document.getElementById(\"movie_player\").setPlaybackQuality(\"" + qualitySwap[quality] + "\") })());'; };";

	var script = document.createElement("script");

	script.text = text;

	// head.innerHTML += text;
	head.appendChild(script);
}


if (customSize)
{
	var page = document.getElementById("page");
	var guide = document.getElementById("guide");
	var content = document.getElementById("content");
	var filler = document.createElement('div');

	var watch_video_container = document.getElementById("watch-video-container");
	if (watch_video_container == null)
	{
		watch_video_container = document.getElementById("watch7-video-container");
	}

	var watch_video = document.getElementById("watch-video");
	if (watch_video == null)
	{
		watch_video = document.getElementById("watch7-video");
	}

	var watch_player = document.getElementById("watch-player");
	if (watch_player == null)
	{
		watch_player = document.getElementById("watch7-player");
	}


	filler.style.width = "0px";
	filler.style.height = height + 25 + "px";
	
	if (guide)
	{
		guide.style.zIndex = "3";
	}
	
	if (page)
	{
		// page.className = "watch watch-branded watch-branded-banner watch-playlist watch-wide watch-playlist-collapsed watch-medium";
		page.className += "watch-wide watch-playlist-collapsed watch-medium";
	}

	watch_video_container.style.padding = "0px";

	watch_video.appendChild(filler);
	watch_video.style.width = "90%";
	

	watch_player.style.width = width + "px";
	watch_player.style.height = height + 25 + "px";
	watch_player.style.position = "absolute";
	watch_player.style.left = "37%";
	watch_player.style.bottom = "0px";
	watch_player.style.margin = "0px " + -width/2 + "px";
	
	content.style.zIndex = "1";
}