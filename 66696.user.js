// ==UserScript==
// @name PBTweet+
// @namespace http://twitter.trauma2u.com/
// @description Pretty Better Tweet!
// @include http://twitter.com/*
// @include https://twitter.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// ==/UserScript==

(function() {
	var pbScript = document.createElement('script');
	pbScript.type = 'text/javascript';
	//pbScript.src = 'http://twitter.trauma2u.com/pbtweet/pbtweet.user.js';
	//pbScript.src = window.location.protocol + '//' + 'pbtweet.s3.amazonaws.com' + '/' + 'pbtweet.user.gz.js';
	pbScript.src = window.location.protocol + '//' + 'deucqe5ih3kaf.cloudfront.net' + '/' + 'pbtweet.user.gz.js';
	//pbScript.src = window.location.protocol + '//' + 'pbtweet.trauma2u.com' + '/' + 'pbtweet.user.gz.js';
	document.getElementsByTagName('head')[0].appendChild(pbScript);
})();
