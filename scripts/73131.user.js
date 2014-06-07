// ==UserScript==
// @name           Youtube Jump player
// @namespace      http://userscripts.org
// @description    Autoscrolls Youtube player to top
// 

//@include        http://www.youtube.com/*

// ==/UserScript==
var player=$("watch-player");

function fitToWindow() {
	player.style.marginLeft = (window.innerWidth >= 960 ? (985 - window.innerWidth) / 2 : "0") + "px";
//	player.style.marginLeft="0px";
	player.style.width = (window.innerWidth-20) + "px";
	player.style.height = (window.innerHeight) + "px";
	$("watch-sidebar").style.marginTop = "1px";
//	$("watch-video-continer").style.height = (window.innerHeight) + "px";
	// $("playnav-player").style.width = (window.innerWidth-20) + "px";
	// $("playnav-player").player.style.height = (window.innerHeight) + "px";
}

function $(A) {
	return document.getElementById(A);
}
//$("bar").style.visibilty="hidden";
$("watch-video-container").scrollIntoView(true);
//$("watch-player").style.width = (window.innerWidth-20) + "px";


//$("watch-player").style.height = (window.innerHeight) + "px";				
fitToWindow();
GM_addStyle(".watch-wide-mode, #watch-player, #watch-player {padding-left:0px!important}");
