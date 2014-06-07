// ==UserScript==
// @name                YouTube mp3 Downloader
// @version             1
// @description		Opens the video in youtube-mp3.org in a new tab so that it can be downloaded in mp3 format
// @include       	http://www.youtube.com/watch?v=*
// ==/UserScript==

var video_id = window.location.search.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

var topbar = document.getElementById('masthead-utility').innerHTML;
document.getElementById('masthead-utility').innerHTML = '<a target="_blank" href="http://www.youtube-mp3.org/get?video_id='+ video_id + '">Download MP3</a>'+topbar;