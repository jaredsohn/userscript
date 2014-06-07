// ==UserScript==
// @name          Download Youtube Videos
// @description	  Adds a link to download the FLV file under every video in Youtube. Make sure that you name the video file 'something.flv'(The extension must be 'flv')
// @namespace     http://www.openjs.com/
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*

//by Binny V A (http://www.openjs.com/)
// ==/UserScript==

(function() {
	var swfArgs = unsafeWindow.swfArgs;
	if (swfArgs) {
		var keys = ["video_id", "sk", "t"];
		var params = keys.map(function(k) { return k + "=" + swfArgs[k]; }).join("&");
		
		//Create the link
		var link = document.createElement('a');
		link.href= "http://www.youtube.com/get_video?" + params;
		var txt = document.createTextNode("Download this Video");
		link.appendChild(txt);
		document.getElementById('watch-player-div').appendChild(link);
	}
})();
