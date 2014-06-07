// ==UserScript==
// @name           Hide World Cup Tweets
// @namespace      http://sagg.im/hideworldcuptweets
// @description    Hide World Cup Tweets
// @author         Saggi Malachi <saggim@sagg.im>
// @version        1.0
// @date           2010-06-19
// @include        http://twitter.com/*
// ==/UserScript==


$ = unsafeWindow.jQuery;
$("body").bind("timeline-changed",function(){findBadTweets();}); 

window.hideBadTweet = function(bad_tweet_id) {
	var hiddentweetcontrol=document.createElement("li");
	hiddentweetcontrol.setAttribute("id",bad_tweet_id+"_control");
	hiddentweetcontrol.setAttribute("style","padding:3px 0 3px;font-size:12px;");

	var bad_tweet_nickname = document.getElementById(bad_tweet_id).className.split(' ')[1].substr(2);
	var control_link_inner_html = '~ Hidden World Cup tweet from <strong>@'+bad_tweet_nickname+'</strong> - <a id="'+bad_tweet_id+'_control_link'+'" style="cursor: pointer;">Show</a>';
	hiddentweetcontrol.innerHTML = control_link_inner_html;
	
	document.getElementById("timeline").insertBefore(hiddentweetcontrol,document.getElementById(bad_tweet_id));
	document.getElementById(bad_tweet_id).style.display = "none";
	document.getElementById(bad_tweet_id+"_control_link").addEventListener("click",function () 
		{document.getElementById(bad_tweet_id).style.display="block";
		document.getElementById(bad_tweet_id+"_control").style.display="none";
		},false);
	
}
window.findBadTweets = function () {
	for (e in document.getElementsByClassName("hashflag")) {
		var bad_tweet_id = document.getElementsByClassName("hashflag")[e].parentNode.parentNode.parentNode.parentNode.id;	
		if (!document.getElementById(bad_tweet_id+"_control")) {
			hideBadTweet(bad_tweet_id);
		}
	}
	
	
}

if(document.getElementById("timeline")) {
	findBadTweets();
}
