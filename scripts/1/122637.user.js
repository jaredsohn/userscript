// ==UserScript==
// @name           YouTube Auto HD + Resizer
// @namespace      modern.elementfx.com
// @include        *.youtube.com/watch*
// ==/UserScript==


var customSize = true;
var width = 1280;
var height = 720;

var customQuality = true;
var quality = "720" // ["240", "360", "480", "720", "1080"]


if (customQuality)
{
	var qualitySwap = {"240":"small", "360":"medium", "480":"large", "720":"hd720", "1080":"hd1080"};

	unsafeWindow.onYouTubePlayerReady = function (playerId) {
		location.href = 'javascript:void((function () { document.getElementById("movie_player").setPlaybackQuality("' + qualitySwap[quality] + '"); })())'
	}
}

if (customSize)
{
	var player = document.getElementById("player");
	var player_api = document.getElementById("player-api");
	var watch_container = document.getElementById("watch7-container");

	// if it's a playlist, add some height
	// playerPadding = 34; // 34 for bottom video bar (volume, playback, etc)
	// if (window.location.href.indexOf("list=") > -1)
		// playerPadding += 34 // another 34 for playlist bar

	// set the player's container height to match the player height (since we're using absolute positioning)
	// player.style.height = height + playerPadding + "px";

	player.style.width = width + "px";
	player_api.style.width = width + "px";
	player.style.height = height + 33 + "px";
	player_api.style.height = height + 33 + "px";
	player_api.style.position = "absolute";
	player_api.style.left = "50%";
	player_api.style.margin = "0px " + -width/2 + "px";

	add_class(watch_container, "watch-wide");
	add_class(watch_container, "watch-medium");
}

function add_class(elm, className)
{
	if (elm.className.indexOf(className) == -1)
		elm.className += " " + className;
}