// ==UserScript==
// @name        Reddit Live Comment Timediff
// @namespace   localhost
// @include     http://reddit.com/*
// @include     https://reddit.com/*
// @include     http://*.reddit.com/*
// @include     https://*.reddit.com/*
// @description Displays a time difference text - for example "3.142 seconds ago" - on the latest comment, updating in almost real-time. Required jQuery to be loaded before (no modifications needed if you're using Reddit Enhancement Suite).
// @version     0.1 alpha
// ==/UserScript==

function attachTimer() {
	var timerID = window.setInterval(function() {
		var nRecentComments = 0;
		$('.comment time').last().html(function(index, oldhtml){
			var commentDate = new Date(this.attributes.getNamedItem("datetime").textContent);
			var secondsDiff = (new Date() - commentDate)/1000;
			if(secondsDiff < 30)
			{
				nRecentComments++;
				return secondsDiff + " seconds";
			}
			return oldhtml;
		});
		if(nRecentComments == 0)
			clearInterval(timerID);
	}, 500);
}

if (typeof unsafeWindow.$ != 'undefined') {
	$ = unsafeWindow.$;
	
	attachTimer();
	$('body').delegate(".save", "click", attachTimer); //For jQuery 1.6.3-
	$('body').on("click", ".save", attachTimer); //For jQuery 1.7+
}