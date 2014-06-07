// ==UserScript==

// @name           LastFm Cleanup

// @namespace      www.traviantrucchi.org

// @author         Dark Simon

// @description    Remove Ads from Last.fm / Lastfm.it 

// @version        3.0

// @include        http://www.lastfm.it/*

// @include        http://www.last.fm/*

// @include        http://www.lastfm.it/user/*

// @include        http://www.last.fm/user/*

// @include        http://www.lastfm.it/music/*

// @include        http://www.last.fm/music/*

// @include        http://www.lastfm.it/event/*

// @include        http://www.last.fm/event/*

// ==/UserScript==


function noDisplayId(theId)
{
	var ads = document.getElementById(theId);
   	if (ads && ads.style.display != 'none')
   		 ads.style.display = 'none';  
}
	
noDisplayId('LastAd_Top');
noDisplayId('LastAd_TopRight');
noDisplayId('LastAd_Mid');
noDisplayId('LastAd_leaderboard');
noDisplayId('LastAd_mpu');
noDisplayId('LastAd_sky');
noDisplayId('LastAd_lowerleaderboard');

var ads = document.getElementsByTagName('body').item(0);
ads.style.background = 'none repeat scroll 0 0 #000000 !important';
