// ==UserScript==
// @name        YouTube Better Layout
// @namespace   http://www.userscripts.org
// @description Changes the new YouTube layout to a better one
// @include     http://*youtube.com*
// @include     https://*youtube.com*
// @exclude	http://*youtube.com/yt/*
// @exclude	https://*youtube.com/yt/*
// @version     1.04
// @grant 	GM_addStyle
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	// Center the website
	$('body').removeClass('site-left-aligned');
	$('body').removeClass('site-center-aligned');
	
	// Check if the user is logged in
	if($('#yt-masthead-signin').length == 0) {
		if(location.pathname == "/") {
			// Move to subscriptions page
			window.location = "/feed/subscriptions/u";
		} else {
			// Change youtube link to subscriptions page
			$('#logo-container').attr('href', '/feed/subscriptions/u');
		}
	}
});

if (location.pathname === "/watch")
{
	GM_addStyle("body{background-color: #777777} #watch7-sidebar{background-color: white;}.watch-medium #watch7-player{height:559px !important; width:945px !important;}#watch7-main{background-color: white;}#watch7-headline{background-color: transparent;border:none;color:white;padding:0px 5px 9px}.yt-uix-expander-head{color:white;}.yt-uix-expander-head:hover{color:white !important;}#watch7-user-header{margin-top:20px;}#watch7-sidebar .watch-sidebar-section{margin-top:12px;}");
	
	// Guide
	GM_addStyle("#guide-container{background-color:white;} .sidebar-collapsed #watch7-video, .sidebar-collapsed #watch7-main, .sidebar-collapsed .watch7-playlist{left: 29px; width: 945px;}");
	$('#guide-container').css('left', '-130px');
	$('#guide-container').css('top', '47px');
		
	// Move alerts to the top of the page
	$('.yt-alert').insertBefore('.primary-col');
	
	// Move title
	if($('#watch7-playlist-container').length > 0) {
		$('#watch7-headline').insertBefore('.watch7-playlist-bar');
		
		// Fix some issues with the playlist
		GM_addStyle(".watch-medium .watch7-playlist-bar{width: 945px;}.watch-playlist #watch7-video-container{margin-top: -82px;}#watch7-headline{padding-top: 8px 5px 9px 0px;}.sidebar-collapsed .watch-medium .watch7-playlist-bar{width: 945px;}.sidebar-collapsed #watch7-playlist-bar-count, .sidebar-collapsed #watch7-playlist-bar-shuffle-button{display:inline-block;}.sidebar-collapsed .watch7-playlist-bar-right{width:305px;}.watch-branded-banner.watch-playlist #watch7-sidebar{margin-top:0px}");
	} else {
		$('#watch7-headline').insertBefore('#watch7-player');
	}
}
else if(location.pathname === "/ServiceLogin" || location.pathname === "/SignUp") {
	// Don't add CSS to this page.
}
else
{
	GM_addStyle("body{background-color: #777777} #watch7-sidebar{background-color: white;}#watch7-player{height:559px !important; width:945px !important;}#guide{background-color:white;}#content{background-color:white}#baseDiv{background-color: white; width: 993px;}.yt-uix-pager{margin-top:0px;padding-bottom:20px;}");
	if (location.pathname === "/results")
	{
		// Fix for search results (from tezcan34)
		document.getElementById('page') ? document.getElementById('page').style.width = '1003px' : '';
	}
}
