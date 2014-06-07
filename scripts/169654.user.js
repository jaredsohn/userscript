// ==UserScript==
// @name           Old Player Test
// @description    Test
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// @version        1.0
// ==/UserScript==

playerContainer = $("#player #player-api");
	playerElement = $("#movie_player");
	flvars = playerElement.attr("flashvars");
	plsrc = playerElement.attr("src");

plsrc = "//s.ytimg.com/yt/swfbin/watch.swf";
		flvars = flvars.replace("watermark=", "watermark=0&null=");
		flvars += "&watermark=0";
		$("body").addClass("player3");