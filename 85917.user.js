// ==UserScript==
// @name           Fullscreen streams/video embed fix for multi-monitor setup
// @namespace      fsstream
// @description    Watch streams/video embeds in fullscreen mode. Currently tested on: ESL.tv
// @include        http://tv.esl.eu/*/esltv_stream/stream/*
// @include        http://tv.esl.eu/*/esltv_edge_free/*
// @include        http://www.esl-world.net/*/esltv_stream/*
// @include        http://*.blip.tv/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var embedobj;

//find the embed
//if ($("#gslPlayer").length)	// GOMTV.net
//	embedobj = $("#gslPlayer");
if ($("embed").length)	// ESL.tv
	embedobj = $("embed");

//add button
if (typeof embedobj != "undefined")
	$(embedobj).after('<div style="position: absolute; z-index:9999;"><input id="go_fullscreen" type="button" value="Fullscreen" /></div>');

$("input#go_fullscreen").click(function ()
{ 
	var maxHeight = $(window).height();
	var maxWidth  = $(window).width() - 3;
	
	//resize the video
	$(embedobj).css("top", 1).css("left", 1).css("position", "absolute").css('z-index', 99999);
	$(embedobj).attr("width", maxWidth).attr("height", maxHeight);
	
	//move the whole website down
	$("body").css("margin-top", maxHeight+20);
	$(window).scrollTop(0);
});
