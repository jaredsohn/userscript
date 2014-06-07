// ==UserScript==
// @name			Youtube-MP3'er
// @namespace		http://www.youtube.com
// @description	Add an option in YouTube to download the video in MP3 format (www.youtube-mp3.org)
// @include		/^https?://(www\.)?youtube\.com/.*$/
// @include		/^https?://(www\.)?youtu\.be/.*$/
// @version		0.1.1
// ==/UserScript==
/////////////////////
//
/////////////////////

// prevents running the script more than once
if (window.top != window.self) return;

// vars
var urlSeed = "http://www.youtube-mp3.org/?c#v=";
//var reg = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;	// gives [0]=<full URL>  &&  [1]="XXXXX"
//var reg = /(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)/;	// gives [0]="watch?v=XXXXX"  &&  [1]="XXXXX"
var vID = (document.location + "").match(/(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)/);

// verify video ID
if (vID[1].length == 11) {
	// success, found 11-char video ID
	urlSeed = urlSeed + vID[1];
	
	// watch-headline-user-info
	var head = document.getElementById("watch-headline-user-info");
	head.innerHTML = head.innerHTML + "<span class=\"yt-uix-button yt-uix-tooltip yt-uix-expander-collapsed\" style=\"padding: 2px 4px 5px; margin-left: 10px;\" data-tooltip=\"Download this video as an MP3\" id=\"youtube-mp3-download\"><a href=\"" + urlSeed + "\" style=\"text-decoration: none; color: rgb(0, 0, 0); font-size: 12px;\" class=\"yt-uix-button-content\" title=\"Download this video as an MP3\" target=\"_blank\"><b>Download (MP3)</b></a></span>";
}/* else {
	// failed
}*/

