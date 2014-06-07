// ==UserScript==
// @name        Auto Like Linus
// @description Script to automatically like LinusTechTips videos.
// @author      Patpat0000
// @include     *.youtube.com/watch*
// @version     1
// @grant       none
// ==/UserScript==

	var balls = document.getElementsByClassName("yt-user-name");
	if(balls[0].text == "LinusTechTips") {
		setTimeout(function() {
    		document.getElementById("watch-like").click();
	}, 1000);
	}