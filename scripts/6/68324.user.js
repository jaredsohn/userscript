// ==UserScript==
// @name           YouTube - Use older, Gnash-friendly player2.swf
// @namespace      http://ianen.org/greasemonkey/
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// ==/UserScript==
(function(){

var map_ = function (xs, f)
{
	for (var ii in xs) { f (xs[ii]); }
};

var parse_qs = function (str)
{
	params = {};
	map_ (str.replace ("+", " ").split ("&"), function (raw)
	{
		var pair = raw.split ("=");
		var key = decodeURIComponent (pair[0]);
		var value = pair.length === 2 ? decodeURIComponent (pair[1]) : key;
		params[key] = value;
	});
	return params;
};

var player_div = document.getElementById ("watch-player-div");
var movie_player = document.getElementById ("movie_player");
var flash_vars = parse_qs (movie_player.getAttribute ("flashvars"));

var video_id = flash_vars["video_id"];
var t = flash_vars["t"];

var new_flash_vars = "t=" + encodeURIComponent (t) + "&video_id=" + encodeURIComponent (video_id);

unsafeWindow.checkCurrentVideo = function () {};

movie_player.setAttribute ("flashvars", new_flash_vars);
movie_player.setAttribute ("src", "http://youtube.com/player2.swf");

})();