// ==UserScript==
// @name			Facebook HD Video Downloader
// @description		Adds a download link for Facebook videos. Works for HD videos as of October 2011.
// @author			styfle
// @include     http://facebook.com/photo.php*
// @include     http://*.facebook.com/photo.php*
// @include     https://facebook.com/photo.php*
// @include     https://*.facebook.com/photo.php*
// @include     http://facebook.com/video/*


// @include     http://*.facebook.com/video/*
// @include     https://facebook.com/video/*
// @include     https://*.facebook.com/video/*
// ==/UserScript==

function appendDownloadLink() {
	var scripts = document.getElementsByTagName('script');
	var hd_url = null;
        var low_url = null;
        var thumb_url = null;

	for (var i=0; i<scripts.length; i++) {
		var html = scripts[i].innerHTML;
		var start = html.indexOf('video_src');
		if (start != -1) {
			hd_url = html.substring(start, html.indexOf('motion_log'));
			break;
		}
	}
       
		hd_url = hd_url.substring(hd_url.indexOf('"http')+1, hd_url.indexOf('"]'));

		hd_url = hd_url.replace(/\\u([\d\w]{4})/gi,
			function(match, grp) {
				return String.fromCharCode(parseInt(grp, 16));
			}
		);

		hd_url = unescape(hd_url);




alert(hd_url);
              
}

window.setTimeout(appendDownloadLink, 500);