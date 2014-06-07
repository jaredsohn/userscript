// ==UserScript==
// @name           Remove Ads from WoW Allakhazam Item Search
// @namespace      http://userscripts.org/users/58139
// @description    Removes ads from WoW Allakhazam item search page
// @include        http://wow.allakhazam.com/*
// ==/UserScript==

var topAd=document.getElementById("bannerMain");

if(topAd!=null)
	topAd.parentNode.removeChild(topAd);


var rtAd=document.getElementById("towerRt");

if(rtAd!=null)
	rtAd.parentNode.removeChild(rtAd);

var cubeAd=document.getElementById("cubeAd");

if(cubeAd!=null)
	cubeAd.parentNode.removeChild(cubeAd);