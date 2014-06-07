// ==UserScript==

// @name     		Twitter Autoflow
// @description		Automatically loads new tweets
// @include  		https://twitter.com/*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require  		https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version	 	1.0
// @license		GPL v3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @grant    		GM_addStyle

// ==/UserScript==


function letTheTweetsFlow(jNode) {
	var newTweets = jNode.attr('data-item-count');

	if(newTweets > 0) {
		$('div.new-tweets-bar').click();
	}
}

waitForKeyElements('div.new-tweets-bar', letTheTweetsFlow);
