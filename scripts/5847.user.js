// ==UserScript==
// @name          YouTube Video Exposer
// @description   Links video title to the FLV video file and removes ads on YouTube.com
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// YouTube URL: http://www.youtube.com/watch?v=[video_id]
// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]

var download_url = 'http://www.youtube.com/get_video?video_id=';

var playerDiv = document.getElementById('movie_player');
var t_id = playerDiv.src.match(/t=([^(\&|$)]*)/)[1];
var video_id = window.location.href.split("?")[1].match(/v=([^(\&|$)]*)/)[1];
var video_url = download_url + video_id + '&t=' + t_id;

// Add video link
var vidTitle = document.getElementById("video_title");
vidTitle.innerHTML = '<a href="' + video_url + '" type="video/x-flv" style="text-decoration:none">' + vidTitle.innerHTML + '</a>';

// Remove add (or empty space left by adblock)
var ad = document.getElementById("leaderboardAd");
if (ad != null) ad.parentNode.removeChild(ad);