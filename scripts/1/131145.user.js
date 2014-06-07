// ==UserScript==
// @name           Tweet Using Enter
// @namespace      http://www.taylorhokanson.com
// @description    Submit a new tweet using keyboard only (no mouse)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

//For use with Twitter as of April 2012
//With thanks to
//http://stackoverflow.com/questions/7283923/greasemonkey-with-jquery-how-to-write-the-greasemonkey-script-to-modify-page-do

//--- This handles both page-load delays, and AJAX changes.
setInterval (function() { checkForTweetbox (); }, 500);

function checkForTweetbox () {
	var tweetbox = document.querySelector ('div.tweet-box textarea');	//check for new tweet window
	if (tweetbox) {
		if (! tweetbox.weHaveProcessed) {
			tweetbox.weHaveProcessed    = true;
//			alert ('New tweet-box found!');
		}
	}	
	tweetbox.onkeydown = function(event){
		if(event.keyCode == 13){										//13 = Enter keycode
			document.querySelector ('a.primary-btn').click();			//there must be at least one character in the textarea	
		}
	}			
}
