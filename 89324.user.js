// ==UserScript==
// @name           Search BBC Radio 1 chart songs on Hypem
// @namespace      http://denbuzze.com/
// @description    Adds an image on every song in the bbc charts which will search the it on hypem
// @include        http://www.bbc.co.uk/radio1/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var hypemlink = "http://hypem.com/#/search/"
var artist, track;
var hypemlogo = "R0lGODlhEAAQAPcOAITFQozFQq3ehOTx0+/35v///+vVuO9VKveTePn98P/q5uY6AO86AO86CABlAHYAegBoAGUAeQAxADAAeAAxAGEANAAxAGUAZwBcAGEAZgB2AGMAaQBvAC4AbgBnAGYAaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAA0Jy4AAAC7AAC7AAAAADPWANYAAPgAMwAyhgAAuwABAAAAAAAuAAAAAProADMAEnbudS4BMHUSAAB27nLSvQAAAAAAAOgALgA0JwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPWADhYAAAALgAAAC4AAAFIAAAALgAAAAAAADhYAAIALgIAAAAAAAG9AAC8AAAAAQAAAAAAAAMAAAAAAAAAAAEAAD0AAAAAAQAAAAbQAIDWAAAAAAAAAJVwAAAAMwAAAAAAAAAAAAAAAAAAAS44oAAAAAAAAAAAAAAAADhYAAAALgAAADQn6NYAACgAM3LSvRL66AAAAAAAAAAABAEB4PoIAQAAEgAAABL7pJn6ABh26AQtCv///nUS/0V27nbudQAAACfoAHAANHbuZgAAAAAAAAAAAAAAAO5mcPuAdtwAEnVYsAAAAAAAAAAAAAAAAF0plAAYAAAAAAAAABL7aABAAAAAAAAAABL7TAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAgEBAAAAAAAAAAAAAAAAAAIAAAAAABoAhCfoAgAANAAAAAAAACfoAAUANAAAABL7yA4qANQAWgAAAQAAAAAAwAAAAAAAAAAAAgAAAAAAAAAAABL78A54AIAAWgBaDgAAAAAAANQAAAAAAQAAAAAAAGzAAAAxiRL76CH5BAgAAA4ALAAAAAAQABAAAAiMAAEIDCBgAIGDBAYICCCwYYABBSJKjDiA4UACEzMWIMDwoUaNFQVENHDgAIKICEwmiFiwgIIDC2IiQBBzwckCBgvQrMlzwYGIBFburMmg5s+NGA006GkUKEadTGUChVggAcyeN3GKjKhgqM2JC6mibHDAwMSKAAI8HalgIkeHYjOiTTuw4MEECRc2DAgAIf4AOw==";

$(".artist-link").each(function(index){
	artist = $(".artist", this).text();
	track = $.trim($(".track", this).text().replace(/\(.+\)/g, ""));
	
	$(this).after($("<a>").attr({
		"href": hypemlink + artist + " " + track + "/1/",
		"alt": artist + " " + track
	}).css({
		"background": "url(data:image/gif;base64," + hypemlogo + ")",
		"color" : "#1A80D5",
		"display":"block",
		"float" : "right",
		"margin-right" : "10px",
		"padding" :"0",
		"height":"16px",
		"width": "16px"
	}));
});