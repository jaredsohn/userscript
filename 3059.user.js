// ==UserScript==
// @name          Google Video AVI/MPEG Downloader
// @namespace     http://www.joshkinberg.com/
// @description   Provides download links for video files hosted by Google Video in its source format (avi/mpeg/etc..)
// @include       http://video.google.*/*
// ==/UserScript==

// This is just a little modification from Joshua Kinberg script to donwload videos in FLV

// Get macdownloadlink URL

var downloadLink = document.getElementById('macdownloadlink');

// add banner with download link

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="float:right; width: 130px; border: 2px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #0000FF; color: #FFFFFF;">' +
	'<p style="margin: 5px;text-align:center;">' +
	'<a href="' + downloadLink + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">Download Video</a>' +
	'</p></div>';
document.getElementById('pvprogtitle').insertBefore(my_banner, document.getElementById('pvprogtitle').firstChild);

