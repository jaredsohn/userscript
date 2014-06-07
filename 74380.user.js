// ==UserScript==
// @name           Youtube Loopy fixer
// @namespace      http://userscripts.org
// @description    Fixes the edited loopy thing so it actually looks half decent. Also it Autoscrolls Youtube player to top.
//@copyright       ethicks00
//@include        http://www.youtube.com/*

// ==/UserScript==
var player=$("watch-player");

player.style.marginLeft = (window.innerWidth >= 1033 ? (2122 - window.innerWidth) / 2 : "0") + "px";
//	player.style.marginLeft="0px";
	player.style.width = (window.innerWidth-1064) + "px";
	player.style.height = (window.innerHeight-1200) + "px";
	$("watch-sidebar").style.marginTop = "1px";
//	$("watch-video-continer").style.height = (window.innerHeight) + "px";
	// $("playnav-player").style.width = (window.innerWidth-20) + "px";
	// $("playnav-player").player.style.height = (window.innerHeight) + "px";
}

function $(A) {
	return document.getElementById(A);
}
//$("bar").style.visibilty="hidden";
$("watch-video-container") .scrollIntoView(true);
//$("watch-player").style.width = (window.innerWidth-20) + "px";


//$("watch-player").style.height = (window.innerHeight) + "px";				
fitToWindow();
GM_addStyle(".watch-wide-mode, #watch-player, #watch-player {padding-left:3px!important}");