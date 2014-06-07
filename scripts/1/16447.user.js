// ==UserScript==
// @name          FictionPimp's Google Video Downloader
// @description   Provides download links for Flash FLV files hosted by Google Video
// @include       http://video.google.tld/*
// ==/UserScript==
window.addEventListener("load", function(e) {
	content = document.getElementById('durationetc').innerHTML;
	document.getElementById('durationetc').innerHTML = content + '<br /><a href="#" onclick="this.href=unescape(document.getElementById(\'VideoPlayback\').src.match(/videoUrl=([^$)]*)/)[1]);this.firstChild=\'Download Flash Video\';return false;" style="color:green">download</a>';
}, false);
