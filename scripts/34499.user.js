// ==UserScript==
// @name		Digg to Reddit
// @namespace		http://www.dp.cx/userscripts
// @description		Submits things that you Digg to Reddit
// @include		http://digg.com/*
// @include		http://www.digg.com/*
// @version		0.8
// ==/UserScript==

var like_key = GM_getValue('like_key', "");
var dislike_key = GM_getValue('dislike_key', "");

if (like_key.match(/^$/) || dislike_key.match(/^$/)) {
	GM_log("We have to fetch your like/dislike keys.");
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.reddit.com/bookmarklets/",
		headers: {
			"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
			"Accept": "application/atom+xml,application/xml,text/xml",
		},
		onload: function(responseDetails) {
			var page = responseDetails.responseText;
			var like_matches = page.match(/like.png.*?uh=(.*?)&amp;u=/);
			if (like_matches[1]) {
				GM_setValue('like_key', like_matches[1]);
			}
			var dislike_matches = page.match(/dislike.png.*?uh=(.*?)&amp;u=/);
			if (dislike_matches[1]) {
				GM_setValue('dislike_key', dislike_matches[1]);
			}
			GM_log("We got your keys.  You should be good to go now!");
		}
	});
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

// handle digg's
$("a[href^=javascript:dig]").each(function(i){
	$(this).bind("click", function(e){
		var story_link = $(this).parents(".news-summary").find("h3").children("a").attr("href");
		var story_title = $(this).parents(".news-summary").find("h3").text();
		var story_synopsis = $(this).parents(".news-summary").find("p").text();
		
		u = encodeURIComponent(story_link);
		t = encodeURIComponent(story_title);
		
		// submit to reddit
		$(this).after('<a href="http://www.reddit.com/submit?url='+u+'&title='+t+'"><img src="http://www.reddit.com/d/like.png?v='+Math.random()+'&uh='+like_key+'&u='+u+'"></a>');
	});
});

// handle bury's
$("a[href^=javascript:rjp]").each(function(i){
	$(this).bind("click", function(e){
		var story_link = $(this).parents(".news-summary").find("h3").children("a").attr("href");
		var story_title = $(this).parents(".news-summary").find("h3").text();
		var story_synopsis = $(this).parents(".news-summary").find("p").text();

		u = encodeURIComponent(story_link);
		t = encodeURIComponent(story_title);

		// submit to reddit
		$(this).after('<a href="http://www.reddit.com/submit?url='+u+'&title='+t+'"><img src="http://www.reddit.com/d/dislike.png?v='+Math.random()+'&uh='+dislike_key+'&u='+u+'"></a>');
	});
});

}
