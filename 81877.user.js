// ==UserScript==
// @name           Youtube Video Enlarger + Auto Resize
// @namespace      http://userscripts.org
// @description    Autoscrolls Youtube player to top and resize the video to a nice and 
//comfortable size.
// @include       http://*.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==
var player=$("watch-player");

function fitToWindow() {
	player.style.marginLeft = (window.innerWidth >= 960 ? (965 - window.innerWidth) / 2 : 

"0") + "px";
	player.style.width = (window.innerWidth-15) + "px";
	player.style.height = (window.innerHeight-1) + "px";
	$("watch-sidebar").style.marginTop = "1px";

	window.setTimeout(fitToWindow, 500);

}

function $(A) {
	return document.getElementById(A);
}
$("watch-video-container").scrollIntoView(true);
			
fitToWindow();
GM_addStyle(".watch-wide-mode, #watch-player, #watch-player {padding-left:3px!important}");

