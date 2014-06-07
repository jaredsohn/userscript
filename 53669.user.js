// ==UserScript==
// @name           Lights Out
// @namespace      download
// @description    Turns the Hulu lights off properly.
// @include        http://hulu.com/watch/*
// @include        http://www.hulu.com/watch/*
// ==/UserScript==

var $=document.getElementById;
var flbs=document.getElementsByClassName("fluid bar");

function lightsOff()
{
	var fls=document.getElementsByTagName("embed");
	for(i=0;i<fls.length;i++)
	{
		if(fls[i].id!="player") fls[i].parentNode.removeChild(fls[i]);
	}
	
	$("overlay-top").style.display="block";
	$("overlay-bottom").style.display="block";
	$("overlay-top").style.opacity="1";
	$("overlay-bottom").style.opacity="1";
	$("description-container").style.opacity="0";
	$("breakout-container").style.opacity="0";
	$("show-and-watch-container").style.opacity="0";
	$("container").style.opacity="0";
	for(i=0;i<flbs.length;i++)
	{
		flbs[i].style.opacity="0";
	}
	document.body.style.backgroundColor="black";
}

function lightsOn()
{
	document.body.style.backgroundColor="white";
	for(i=0;i<flbs.length;i++)
	{
		flbs[i].style.opacity="1";
	}
	$("container").style.opacity="1";
	$("show-and-watch-container").style.opacity="1";
	$("description-container").style.opacity="1";
	$("breakout-container").style.opacity="1";
	$("overlay-top").style.opacity="0";
	$("overlay-bottom").style.opacity="0";
	$("overlay-top").style.display="none";
	$("overlay-bottom").style.display="none";
}

unsafeWindow.lightsOn=lightsOn;
unsafeWindow.lightsOff=lightsOff;