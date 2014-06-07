// YouTube External Launcher
// Version 0.2.1
// 2012-12-22
// Copyright (c) 2010-2012
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			YouTube External Launcher
// @namespace		None
// @description		Adds an link to YouTube videos to watch them with an external player
// @homepageURL 	http://userscripts.org/scripts/show/154708
// @updateURL 		https://userscripts.org/scripts/source/154708.meta.js
// @version			0.2.1
// @notes			None
// @include			http*://youtube.com/watch?*
// @include			http*://*.youtube.com/watch?*
// @include			http*://youtube.com/watch#*
// @include			http*://*.youtube.com/watch#*
// @include			http*://youtube-nocookie.com/watch?*
// @include			http*://*.youtube-nocookie.com/watch?*
// @include			http*://youtube-nocookie.com/watch#*
// @include			http*://*.youtube-nocookie.com/watch#*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// ==/UserScript==

$(function(){
	var title = $('#watch-headline-title').html();
	var VideoArgs = window.location.search.split('&');
	//var ampersandPosition = VideoID.indexOf('&');
	if (VideoArgs.length == 1) {
		VideoID = VideoArgs[0].substr(3);
	} else {
		for (var i=0;i<VideoArgs.length;i++) {
			if (VideoArgs[i].indexOf('v=') != -1) {
				VideoID = VideoArgs[i];
				if (VideoArgs[i].indexOf('?v=') != -1) {
					VideoID = VideoID.substr(3);
				} else {
					VideoID = VideoID.substr(2);
				}
			}
		}
	}
	$('#watch-headline-title').html(title + '<a href=yt://' + VideoID + ' style="color:#999999"> (View Externally)<a>');

});