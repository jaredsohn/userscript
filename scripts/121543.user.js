// ==UserScript==
// @name           Tweetify Facebook
// @namespace      http://pimaxplus.com
// @description    Linkify tweets on facebook statusses.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

window.addEventListener('load', function() {	
	var status = document.getElementsByClassName('messageBody');

	for(i = 0; i < status.length; i++) {
		status[i].innerHTML = Linkify(status[i].innerHTML);
	}

	function Linkify(text) {
		text = text.replace(/(^|)@(\w+)/gi, function (s) {
			return '<a onclick="window.open(this.href); return false;" href="http://twitter.com/' + s + '">' + s + '</a>';
		});

		text = text.replace(/(^|)#(\w+)/gi, function (s) {
			return '<a onclick="window.open(this.href); return false;" href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
		 });
		return text;
	}
}, false);