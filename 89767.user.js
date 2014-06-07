// ==UserScript==
// @name            Myspace Standalone Music Player
// @namespace       http://www.myspace.com
// @description     Upon loading a Myspace page, this will reload to display the fullscreen music player.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include         http://*.myspace.com/*
// @include			http://*myspace.com/*
// ==/UserScript==


var player = $("#shell");
var m, f;

$(player).children('param').each(function() {
	if($(this).attr("name") == "movie") m = $(this).attr("value");
	else if($(this).attr("name") == "flashvars") f = $(this).attr("value");
});
	
if(m && f) window.location.href = m + '?' + f;