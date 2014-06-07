// ==UserScript==
// @name           YouTube - No Widescreen Player
// @description    Disable the Widescreen player, usefull if you don't watch HD video's.
// @author         http://userscripts.org/users/tombuutkamp
// @version        2.3
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// ==/UserScript==

// settings - use a 16:9 resolution
var customSize = true;
var width = 640;
var height = 480;

var customQuality = true;
var quality = "360" // ["240", "360", "480", "720", "1080"]


// script
if (customQuality) {
	var qualitySwap = {"240":"small", "360":"medium", "480":"large", "720":"hd720", "1080":"hd1080"};
	var header = document.getElementsByTagName('head')[0];
	var script = document.createElement("script");
	var text = document.createTextNode('onYouTubePlayerReady = function (playerId) { location.href = \'javascript:void((function () { 

document.getElementById("movie_player").setPlaybackQuality("' + qualitySwap[quality] + '") })());\'}');
	script.appendChild(text);
	header.appendChild(script);
	
}

if (customSize) {
	var content = document.getElementById("content");
	var watch_video = document.getElementById("watch-video");
	var watch_player = document.getElementById("watch-player");
	var filler = document.createElement('div');

	filler.style.width = "1px";
	filler.style.height = height + 33 + "px";

	watch_video.appendChild(filler);

	watch_player.style.width = width + "px";
	watch_player.style.height = height + 33 + "px";
	watch_player.style.position = "absolute";
	watch_player.style.left = "50%";
	watch_player.style.margin = "0px " + -width/2 + "px";
	
	content.className = "watch-wide";
}