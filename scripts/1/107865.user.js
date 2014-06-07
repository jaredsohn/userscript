// ==UserScript==
// @name Natural Youtube Downloader
// @description Natural looking tool for downloading YouTube videos.
// @version 1.0.2
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude
// ==/UserScript==
var flag, newElement, url;
var playerElement = document.getElementById('movie_player');
flag = document.getElementById("watch-flag");
function download(){window.open("http://www.savevid.com/?url=" + document.URL); playerElement.pauseVideo();}
if (flag) {
newElement = document.createElement('button');
newElement.innerHTML = '<button style="margin-left: 3px;" onclick=";return false;" title="Download" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" id="downloadbtn" data-button-action="" role="button" aria-pressed="false" data-tooltip="Download this video" data-tooltip-title="I like this" data-tooltip-timer="6761"><img height = "17" width = "15" src="http://i1223.photobucket.com/albums/dd515/TheDuceCat/Icons/DownloadArrow.png" style = "margin-right: 5px;" alt=""><span class="yt-uix-button-content">Download</span></button>'
newElement.addEventListener('click',download,true);
flag.parentNode.insertBefore(newElement, flag.nextSibling);
}