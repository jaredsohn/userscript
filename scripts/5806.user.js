// ==UserScript==
// @name          YouTube to me
// @namespace     http://www.joshkinberg.com/
// @description   Provides download links for Flash FLV files hosted by YouTube.com
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// YouTube URL: http://www.youtube.com/watch?v=[video_id]
// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]

var download_url = 'http://youtube.com/get_video?video_id=';

var playerDiv = document.getElementById('movie_player');
var t_id = playerDiv.src.match(/t=([^(\&|$)]*)/)[1];
var url_vars = window.location.href.split("?")[1];
var video_id = url_vars.match(/v=([^(\&|$)]*)/)[1];
var video_url = download_url + video_id + '&t=' + t_id;


// add banner with download link

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #FF0000; color: #FFFFFF;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">"Save As" to download Flash video</a>' +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin

document.body.style.margin = '0px';