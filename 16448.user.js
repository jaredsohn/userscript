// ==UserScript==
// @name          FictionPimp's Youtube Downloader
// @description	  Adds a link to download youtube videos.
// @include       http://youtube.tld/watch?*
// @include       http://www.youtube.tld/watch?*
// ==/UserScript==
window.addEventListener("load", function(e) {
	// First, set the download URL and get the id for the video.
	var download_url = 'http://youtube.com/get_video?';
	var download_id = document.getElementById('movie_player').getAttribute('flashvars');
	var link_url = download_url+download_id;
	// Now we put a link for the download on the page.
	input = document.getElementById('channelStats').innerHTML;
	document.getElementById('channelStats').innerHTML = input + ' <a href="' + link_url + '">download</a>';
}, false);
