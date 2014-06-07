// ==UserScript==
// @name			Reddit Comment Karma
// @namespace		capncanuck
// @description		Adds the user's comment karma to the user header
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include			http://www.reddit.com/*
// ==/UserScript==

(function() {
	$(document).ready(function() {
		if ($('.user a').html() !== 'register') {
			return $('.user b').load('http://www.reddit.com/user/' + $('.user a').html() + ' .karma', function(response, status) {
				if (status === 'success') {
					return $('.karma').eq(0).after('&nbsp;/&nbsp;');
				}
			});
		}
	});
}).call(this);
