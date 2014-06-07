// ==UserScript==
// @name           Pop-up actual time for TweetDeck
// @version        0.2.2
// @namespace      http://twitter.com/inmoutan
// @auther         inmoutan
// @description    Pop-up actual time with hovering mouse over relative time for TweetDeck.
// @include        https://web.tweetdeck.com/*
// @include        https://tweetdeck.twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant          none
// ==/UserScript==


(function($) {
	var filter = function(elem){
			if(!$(elem).find("a.txt-small").attr("title")){
				var data = new Date();
				data.setTime($(elem).attr("data-time"));
				if(data!=null){
					$(elem).find("a.txt-small").attr("title", data.toLocaleString());
				}
			}
	}
	
	$(document).delegate(".tweet-timestamp", "mouseover", function() {
		filter($(this));
	});
	
})(jQuery.noConflict(true));