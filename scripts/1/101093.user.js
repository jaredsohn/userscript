// ==UserScript==
// @name           YouTube 720p Resizer
// @description    Sets YouTube video player to display a full 720p resolution. This script only changes the size of the elements on page. It does not auto-select 720p or higher resolution for playback.
// @version        0.1
// @author         FattyMoBookyButt
// @license        MIT License
// @include        http://*.youtube.*/*
// @include        http://youtube.*/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// ==/UserScript==
// var GM_Debug = 0;
// if(GM_Debug) {
// 	if(unsafeWindow.console){
// 		var GM_log = unsafeWindow.console.log;
// 	}
// } else {
// 	var GM_log = function(){};
// }

var content = document.getElementById("content");
var player = document.getElementById("watch-player");
var moviePlayer = document.getElementById("movie_player");
var watchVideo = document.getElementById("watch-video");
var watchMain = document.getElementById("watch-main");
var watchPanel = document.getElementById("watch-panel");
var watchSidebar = document.getElementById("watch-sidebar");
var watchHeadline = document.getElementById("watch-headline");
var watchHeadlineTitle = document.getElementById("watch-headline-title");

// function fitToSevenTwenty() {
	var controlsHeight = 30;
	var displayHeight = 720 + controlsHeight + 'px';
	var displayWidth = 1280 + 'px';
	
	content.setAttribute('class', 'watch-wide');
	watchVideo.setAttribute('class', 'wide');
	
	watchHeadline.style.width = displayWidth;
	watchMain.style.width = displayWidth;
	watchPanel.style.width = "950px";
	watchSidebar.style.marginTop = "0";
	
	moviePlayer.style.outline = "none";
	
	watchVideo.style.width = displayWidth;
	watchVideo.style.height = displayHeight;
	
	player.style.width = displayWidth;
	player.style.height = displayHeight;
	
	watchHeadlineTitle.scrollIntoView(true);
	
	// GM_log('fitToSevenTwenty ran!');
// }
// window.setTimeout(fitToSevenTwenty, 444);