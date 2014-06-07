// ==UserScript==
// @name           YTAPYoutubePlayerPosAndSize
// @namespace      http://userscripts.org/users/272625
// @description    This sets the position and size of the player to your own settings
// @include        http://*.youtube.com/*
// @version        1.2.0
// ==/UserScript==

//version  1.2.0
//still debugging Ubuntu firefox... 
//changed absolute to relative hoping the Windows and Ubuntu version of firefox will
//give the same result, mainly drawing over the comment box and the suggestions list
//renamed functions


var oldx = 0;
var oldy = 0;
var oldw = 0;
var oldh = 0;
var intv = -100;
var tm;
function YTAP_PPASResetMoviePos()
{
//alert("YTAP_PPASResetMoviePos");
	clearInterval(intv);
	intv = -100;
	if(document.getElementById('movie_player')) 
		unsafeWindow._gel('movie_player').seekTo(tm, true);
}

function YTAP_PPASRememberViewerSettings()
{
//alert("YTAP_PPASRememberViewerSettings");
	if(!document.getElementById('movie_player')) return;
	oldx = document.getElementById("watch-player").style.left;
	oldy = document.getElementById("watch-player").style.top;
	oldw = document.getElementById("watch-player").style.width;
	oldh = document.getElementById("watch-player").style.height;
}

function YTAP_PPASResetViewerDefault()
{
//alert("YTAP_PPASResetViewerDefault");
	if(!document.getElementById('movie_player')) return;
	tm = Math.round(unsafeWindow._gel('movie_player').getCurrentTime());
	document.getElementById("watch-player").style.position = "relative";
	document.getElementById("watch-player").style.left = oldx;
	document.getElementById("watch-player").style.top = oldy;
	document.getElementById("watch-player").style.width = oldw;
	document.getElementById("watch-player").style.height = oldh;
	intv=setInterval(function(){YTAP_PPASResetMoviePos();}, 1000);
}

function YTAP_PPASSetViewerUser()
{
//alert("YTAP_PPASSetViewerUser");
	if(!document.getElementById('movie_player')) return;
	tm = Math.round(unsafeWindow._gel('movie_player').getCurrentTime());
	
	var values = GM_getValue('YTAP_PosAndSize','0,0,800,380').split(",");
	document.getElementById("watch-player").style.position = "relative";
	document.getElementById("watch-player").style.left = (values[0]) + "px";
	document.getElementById("watch-player").style.top = (values[1]) + "px";
	document.getElementById("watch-player").style.width = (values[2]) + "px";
	document.getElementById("watch-player").style.height = (values[3]) + "px";
	intv=setInterval(function(){YTAP_PPASResetMoviePos();}, 1000);
}


function YTAP_PPASOnUnload()
{
	if(intv != -100) 
	{
		clearInterval(intv);
		intv = -100;
	}
}

function YTAP_PPASOnLoad()
{
	YTAP_PPASRememberViewerSettings();
	if(GM_getValue('YTAP_PosAndSizeON',false))
	{
		YTAP_PPASSetViewerUser();
	}
	return;
}

function YTAP_PPASSetPos()
{
	GM_setValue('YTAP_PosAndSize',prompt('Enter position and size in pixels...\r\nFormat is: x,y,width,height\r\n\r\nNo validation is done of the values so be careful.', GM_getValue('YTAP_PosAndSize','0,0,640,480')));
	if(GM_getValue('YTAP_PosAndSizeON',false))
	{
		YTAP_PPASSetViewerUser();
	}
}

function YTAP_PPASSetPosEnabled(tf)
{
	GM_setValue('YTAP_PosAndSizeON',tf);
	var v = "OFF";
	if(tf) v = "ON";
	alert("YTAP Positioning is turned " + v + ".  The state will remain " + v+ " until you change it again.");
	if(GM_getValue('YTAP_PosAndSizeON',false))
	{
		YTAP_PPASSetViewerUser();
	}
	else if(!GM_getValue('YTAP_PosAndSizeON',false))
	{
		YTAP_PPASResetViewerDefault();
	}
}

window.addEventListener('load', function(){YTAP_PPASOnLoad();}, false);
window.addEventListener('unload', function(){YTAP_PPASOnUnload();}, false);


GM_registerMenuCommand('YTAP Enable Positioning', function(){YTAP_PPASSetPosEnabled(true);});
GM_registerMenuCommand('YTAP Disable Positioning', function(){YTAP_PPASSetPosEnabled(false);});
GM_registerMenuCommand('YTAP Set Player Position and Size', function(){YTAP_PPASSetPos();});



