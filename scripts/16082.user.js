// ==UserScript==
// @name          All YouTube Video Downloader
// @namespace     http://davewouters.com/projects/
// @description   Helps to download video's from any given Language version of YouTube, based on YouTube to me v2
// @include       http://www.youtube.*/*
// @include       http://*.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// YouTube URL: http://www.youtube.com/watch?v=[video_id]
// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]

var download_url = 'http://youtube.com/get_video?video_id=';

var playerDiv = document.getElementById('movie_player');
var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
var t_id = flashvars.match(/t=([^(\&|$)]*)/)[1];
var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
var video_url = download_url + video_id + '&t=' + t_id;


// add banner with download link

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #CC0000; color: #FCFDFE;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">Use "Save As" to download Flash video.</a>' +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin

document.body.style.margin = '0px';