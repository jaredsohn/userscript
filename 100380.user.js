// =======[ GTAForums YouTube Thing v2.0 ]=================
// Created by Edmachine
// This (very) little script adds a little bit of text on
// a YouTube Video page, that opens up a prompt window,
// which has the GTAF YouTube BBCode already highlighted
// and ready to be copied. I've found myself just copying 
// ID after ID, writing the [youtube] tags manually many 
// times, but now I have put an end to it. 
// I hope this helps you, too.
// 
// =======[ CHANGELOG ]====================================
// -------[ 1.1 ]------------------------------------------
// 1. Added a thing that gives you a link to the video with
//   BBCode.
// -------[ 1.2 ]------------------------------------------
// 1. Added the BBCode and Link things to Favorites and
//   My Videos pages.
// -------[ 1.3 ]------------------------------------------
// 1. Added support for Playlists (and Watch Later) pages.
// 2. Added support for Liked videos page.
// 3. Added support for History page.
// 4. Added support for Purchases page.
// 5. Added support for Content ID Matches page.
// -------[ 2.0 ]------------------------------------------
// 1. Support for the new design.
// 2. Removed support for Purchases, Content ID Matches.
//
// ==UserScript==
// @name           GTAForums YouTube Thing
// @namespace      Edmachine
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/*
// @version        2.0
// ==/UserScript==

// Thanks to lobo235 for the function!
// http://www.netlobo.com/url_query_string_javascript.html
function getURLParameter(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	} else {
		return results[1];
	}
}

// Thanks to Dustin Diaz for the function!
// http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null ) {
		node = document;
	}
	if ( tag == null ) {
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var url = document.location.pathname;
if(url == "/my_favorites" || url == "/my_videos" || url == "/my_liked_videos" || url == "/my_history") {
	var video_cont = document.getElementById("vm-video-list-containter");
	var video_list = getElementsByClass("vm-video-item",video_cont);
	var video_metrics = getElementsByClass("vm-video-metrics",video_cont);
	var video_id = getElementsByClass("video-checkbox",video_cont);
	var video_title = getElementsByClass("vm-video-title-container",video_cont);
	var i = 0;
	if(url == "/my_playlists") {
		while(i < video_list.length){
			var yt_bbcode = "[youtube]" + video_id[i].value.split(":")[1] + "[/youtube]"
			var yt_url = "[url=http://www.youtube.com/watch?v=" + video_id[i].value.split(":")[1] + "]" + video_title[i].firstElementChild.firstChild.data + "[/url]";
            video_metrics[i].innerHTML += "<span class=\"vm-video-metric-value\" style=\"display: inline;\"><a onClick=\"prompt('Copy the text below!','" + yt_bbcode + "')\">BBCode</a></span> ";
			video_metrics[i].innerHTML += "<span class=\"vm-video-metric-value\" style=\"display: inline;\"><a onClick=\"prompt('Copy the text below!','" + yt_url + "')\">Link</a></span>";
			i++;
		}
	} else {
		while(i < video_list.length){
			var yt_bbcode = "[youtube]" + video_id[i].value + "[/youtube]"
			var yt_url = "[url=http://www.youtube.com/watch?v=" + video_id[i].value + "]" + video_title[i].firstElementChild.firstChild.data + "[/url]";
            video_metrics[i].innerHTML += "<span class=\"vm-video-metric-value\" style=\"display: inline;\"><a style=\"width: 40%; display: inline;\" onClick=\"prompt('Copy the text below!','" + yt_bbcode + "')\">BBCode</a></span> ";
			video_metrics[i].innerHTML += "<span class=\"vm-video-metric-value\" style=\"display: inline;\"><a style=\"width: 40%; display: inline;\" onClick=\"prompt('Copy the text below!','" + yt_url + "')\">Link</a></span>";
			i++;
		}
	}
} else if(url == "/watch") {
	var video_id = getURLParameter("v");
	var video_title = document.getElementById("eow-title").title;
	var yt_bbcode = "[youtube]" + video_id + "[/youtube]"
	var yt_url = "[url=http://www.youtube.com/watch?v=" + video_id + "]" + video_title + "[/url]";
	document.getElementById("watch7-secondary-actions").innerHTML += "<button type=\"button\" class=\"action-panel-trigger   yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty\" onClick=\"prompt('Copy the text below!','" + yt_bbcode + "')\"><span class=\"yt-uix-button-content\">BBCode</span></button><button type=\"button\" class=\"action-panel-trigger   yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty\" onClick=\"prompt('Copy the text below!','" + yt_url + "')\"><span class=\"yt-uix-button-content\">Link</span></button>";
}