// ==UserScript==
// @name           BFSD
// @namespace      BFD
// @description    Download full vids from previews
// @include        http://www.barefootsies.com/videos/*
// ==/UserScript==

//Get the video download URL
var regex = new RegExp(".mp4");
var results = regex.exec(document.getElementById("video-player").innerHTML);
var videoID = document.getElementById("video-player").innerHTML.substr(results.index - 13, 17);
var downloadURL = "http://www.barefootsies.com/media/videos/" + videoID;

//Replace the download link with a link to the mp4
document.getElementById("video-download").innerHTML = "<a href=\"" + downloadURL + "\">DOWNLOAD FULL MP4 VIDEO</a>";