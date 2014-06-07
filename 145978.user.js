// ==UserScript==
// @name	AllMyVideos Unlimited Free Videos
// @version	1.1b
// @namespace	http://allmyvideos.net
// @description	Allows the user to watch as many videos on AllMyVideos without worry of hitting the free limit, autoplays videos and also should remove adverts
// @include	http://*.allmyvideos.net/*
// @include	http://allmyvideos.net/*
// @include	https://*.allmyvideos.net/*
// @include	https://allmyvideos.net/*
// ==/UserScript==
var codetxt = "function remove(a){return(elem=document.getElementById(a)).parentNode.removeChild(elem)}$('#submitButton').click();player_start=function(){$$('player_ads').style.display='none';$$('player_img').style.display='none';$$('player_code').style.visibility='visible';if($('#cblocker').length){if(navigator.appVersion.indexOf('Win')!=-1){$$('cblocker').style.visibility='visible'}}if($$('np_vid'))$$('np_vid').Play();if(jwplayer)jwplayer().play();player_ads=$$('player_ads');player_ads.parentNode.removeChild(player_ads);return false};updateTimeLimit=function(){timeRemaining=1e4};remove('OnPlayerBanner');remove('timelimitblock');remove('tlstatus');remove('fadeshow1');remove('socialmedia');remove('premiumsuggestion');player_start();";
 
var bodyTag = document.getElementsByTagName("body")[0];
var asrpt = document.createElement('script');
asrpt.type = 'text/javascript';
asrpt.innerHTML = codetxt;
bodyTag.appendChild(asrpt);