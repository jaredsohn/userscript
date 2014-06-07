// ==UserScript==
// @name          Google Video Unblock Country 
// @namespace     http://premshree.org/userscripts
// @description	  Play videos from Google Video in countries where it is blocked 
// @include       http://video.google.com/* 
// ==/UserScript==

/*
 * $premshree$ $2006-01-03 16:29$
 */

window.enable_country = function() {
	var div = document.getElementById('playvideoblock');
	if (div) {
		var regexp = /Currently, the playback feature of Google Video isn't available in your country\./i;
		if (div.innerHTML.match(regexp)) {
			var video_html = document.getElementById('embedhtml').value;
			div.innerHTML = video_html;
		}
	}
}

enable_country();
