// ==UserScript==
// @name           Reddit feeling lucky button
// @namespace      http://sagg.im/luckyreddit
// @description    Reddit feeling lucky button
// @include        http://www.reddit.com/*
// ==/UserScript==

(function() {
	var header = document.getElementById('header-bottom-right');
	current_path = window.location.pathname;
	current_subreddit = '';
	if (current_path.split('/')[1]== 'r') {
		current_subreddit = 'r/'+current_path.split('/')[2]+'/'
	}
	header.innerHTML = '<a href="/'+current_subreddit+'random">feeling lucky</a><span class="separator">|</span>'+header.innerHTML;
})();
