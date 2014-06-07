// ==UserScript==
// @name           Twitter - Display the correct number of RTs
// @namespace      http://userscripts.org/users/464157
// @description    Displays the correct number of retweets on a tweet.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://*.twitter.com/*
// ==/UserScript==

var oldOnload = window.onload;
var $ = null;
window.onload = function(event) {
	
	$ = unsafeWindow.jQuery;
	
	$(window).on("DOMNodeInserted", ".stream-item .component, .permalink-tweet .component", null, correctRT.evaluateCount);
	
	
	
	if(oldOnload != null)
		oldOnload(event);
}

var correctRT = {
	
	evaluateCount : function(event) {
		var RTcontainer = $(event.target).find(".js-stat-retweets");
		if(RTcontainer.length == 0)
			return;
		var RTcount = RTcontainer.find("a strong");
		if(RTcount.text() != "50+")
			return;
			
		var tweet = RTcontainer.parents(".stream-item:first");
		if(tweet.length == 0)
			tweet = RTcontainer.parents(".permalink-tweet:first");
		
		if(tweet.length == 0)
			return;
		var tweetId = tweet.attr("data-item-id");
		
		RTcount.css("visibility","hidden");
		setTimeout(function() {
			GM_xmlhttpRequest({
				method: "GET",
				url : "https://api.twitter.com/1/statuses/show/" + tweetId + ".json", 
				onload : function(response) {
					var tweetData = null;
					try {
						eval("tweetData = " + response.responseText);
						if(tweetData != null)
							RTcount.text(tweetData.retweet_count);
					} catch(e) {
						RTcount.text("50+");
						void(0);
					}
					RTcount.css("visibility","");
				},
				onerror : function() {
					RTcount.text("50+");
					RTcount.css("visibility","");
				}
			});
		},
		0);
		//console.log(tweetId + ": " + RTcount.text() + " RTs");
	}
	
}