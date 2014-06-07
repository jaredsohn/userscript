// ==UserScript==
// @name        BandCamp Repeat
// @namespace   bcrepeat
// @description A script to repeat single BandCamp songs.
// @include     http://www.greasespot.net/p/welcome.html?1.8
// @include     http://*.bandcamp.com/track/*
// @include     https://*.bandcamp.com/track/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==

// Usage:  Go to an artist's BandCamp site and click on any single track.
//         Then click on Start Repeat Mode

var div = $('#trackInfo');

div.append('<h2><a id="start" href="#" onClick="checkAndPlay()">Start Repeat Mode</a></h2>');

var start = $('#start');
start.bind('click', init);


function checkAndPlay() {
	var obj = null;
	if(obj === null) {
		obj = $('.playbutton') || $('.playbutton playing');
	
		if (!obj.hasClass("playbutton playing") && !obj.hasClass("playbutton busy")) {
			obj.trigger('click');
			obj = null;
		}
	}
}

function init() {
    checkAndPlay();
    setInterval(function () {
        checkAndPlay();
    }, 50);
}