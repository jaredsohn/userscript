// ==UserScript==
// @name          TnA Flix Downloader
// @namespace     none
// @description   Provides download links for Flash FLV files
// @include       http://www.tnaflix.com/*
// @include       http://video.tnaflix.com/*
// ==/UserScript==

var flashcontent = document.getElementById('VideoPlayback');
var video_url = flashcontent.src.match(/file=([^(\&|$)]*)/)[1];
video_url = video_url.substring(5,video_url.length);

// add banner with download link
var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #FF0000; color: #FFFFFF;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">"Save As" to download Flash video</a>' +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin
document.body.style.margin = '0px';