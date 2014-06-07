// ==UserScript==
// @name           Tweets Search Result
// @namespace      http://userscripts.org/users/130678
// @include        http://www.google.co.jp/*
// @require        http://gist.github.com/3242.txt
// ==/UserScript==
(function() {
	var twitterIcon = document.createElement("img");
	twitterIcon.src = "http://a1.twimg.com/a/1279228556/images/favicon.ico";
	twitterIcon.style.borderStyle = 'none';

	var resultStats = document.getElementById("resultStats");
	if(resultStats){
		var twitterStatus = document.title.substr(0,document.title.lastIndexOf(" -")) + " の検索結果 " + $X("string()", resultStats);
	}else{
		resultStats = document.getElementById("res").firstChild.firstChild;
		var twitterStatus = $X("string()", resultStats);
	}
	var tweetLink = document.createElement("a");
	tweetLink.href = "http://twitter.com/?status=" + encodeURI(twitterStatus);
	tweetLink.appendChild(twitterIcon);
	resultStats.appendChild(tweetLink);
}
)();