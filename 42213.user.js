// ==UserScript==
// @name          Download Youtube Videos v1.1
// @description	  Adds links to download the FLV or MP4 file under every video in Youtube. Make sure that you name the video file 'something.flv'(regular qual) or 'something.mp4'(high qual) (The extension must be correct)
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
		
		

//Create the first link
		var link = document.createElement('a');
		link.href= "http://www.youtube.com/get_video?" + params;		var txt = document.createTextNode("Download this video");
		link.appendChild(txt);
		document.getElementById('watch-player-div').appendChild(link);

//Create and write the seperator
                var space = document.createTextNode(" | ");
                document.getElementById('watch-player-div').appendChild(space);

//Create the second link
		var link2 = document.createElement('a');
		link2.href= "http://www.youtube.com/get_video?" + params + "&fmt=18";		var txt2 = document.createTextNode("Download this in HQ");
		link2.appendChild(txt2);
		document.getElementById('watch-player-div').appendChild(link2);
	}
})();